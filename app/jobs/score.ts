import pMap from "@cjs-exporter/p-map"
import { PrismaClient, feed_items } from "@prisma/client"
import dotenv from "dotenv"
import { ChatCompletionRequestMessage, OpenAIApi, Configuration as OpenAIConfig } from "openai"
dotenv.config()

let prisma: PrismaClient

interface IContentEvaluation {
  title: string
  content: string
  relevance: number
  impact: number
  novelty: number
  reliability: number
}
const openaiConfig = new OpenAIConfig({ apiKey: process.env.OPENAI_API_KEY! })
const openai = new OpenAIApi(openaiConfig)

const AUDIENCE_DESCRIPTION =
  "The target audience is a group of people who are interested in the topic of artificial intelligence research and are looking for the latest state of the art developments in the field. Prioritize research breakthroughs, new discoveries, and novel applications of AI. Ignore engagement baiting, sensationalism, and clickbait."
const MAX_RETRIES = 2

function analyzeSystemPrompt(audience_description: string): string {
  return `You are an AI content analyzer that can only speak in JSON. 
  
  Your task is to evaluate content based on the following criteria:
  - relevance: The relevance of the news story on a scale from 1 to 10, considering whether it directly affects or interests the target audience.
  - impact: The impact of the news story on a scale from 1 to 10, considering the extent of the effects and the number of people impacted.
  - novelty: The novelty of the news story on a scale from 1 to 10, considering how unexpected or new the information is.
  - reliability: The reliability of the news source on a scale from 1 to 10, considering the source's reputation and credibility.

  Additionally, you must come up with a short title and description for the content.
  - title: The title of the content.
  - content: A 2-4 sentence summary of the content without any links. Keep it as objective and close to the original content as possible and avoid adding your own commentary or conclusions.

  You can only respond with JSON that follows this format:
  {
      "title": string,
      "content": string,
      "relevance_explanation": string,
      "relevance": number from 1 to 10,
      "impact_explanation": string,
      "impact": number from 1 to 10,
      "novelty_explanation": string,
      "novelty": number from 1 to 10,
      "reliability_explanation": string,
      "reliability": number from 1 to 10,
  }

  The current date and time is ${new Date().toISOString()}

  Target audience description: "${audience_description}"`
}
export async function evaluateContent(
  content: string,
  remainingJsonRetries: number = MAX_RETRIES,
): Promise<IContentEvaluation | undefined> {
  const systemPrompt = analyzeSystemPrompt(AUDIENCE_DESCRIPTION)
  const messages: ChatCompletionRequestMessage[] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Please evaluate this raw content: ${content}. ONLY respond with valid JSON in the desired format, DO NOT UNDER ANY CIRCUMSTANCES add extra text, explanation, or notes`,
    },
  ]
  let tries = 0
  let response = null

  while (tries < MAX_RETRIES) {
    try {
      response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      })
      break
    } catch (e) {
      console.log(e)
      tries += 1
      console.log("Retrying")
      continue
    }
  }

  if (response == null) {
    throw new Error("ChatGPT failed to respond")
  }

  const evaluation = response.data.choices[0]?.message?.content

  // Retry if the response is not valid JSON
  let result = null

  try {
    result = JSON.parse(evaluation!)

    // Convert scores to float
    const scoreKeys = ["relevance", "impact", "novelty", "reliability"]
    for (const key of scoreKeys) {
      if (result[key] === "null" || result[key] === null) {
        result[key] = 0
      }
      result[key] = parseFloat(result[key])
    }
    if (result.title === undefined || result.content === undefined) {
      console.log(result)
      throw new Error("Missing title or content")
    }
  } catch (e) {
    console.log(e)
    if (remainingJsonRetries > 0) {
      console.log("Retrying (JSON)")
      result = await evaluateContent(content, remainingJsonRetries - tries)
    } else {
      console.log("Exceeded maximum JSON retries")
      return undefined
    }
  }

  return result
}

async function main() {
  prisma = new PrismaClient()

  const itemsWithoutScore = await prisma.feed_items.findMany({
    where: { scores: null },
  })

  console.log(`Found ${itemsWithoutScore.length} items without scores`)

  await pMap(
    itemsWithoutScore,
    async (item: feed_items) => {
      const evaluation = await evaluateContent(item.description_raw)

      if (evaluation == null) {
        console.log(`Failed to evaluate item ${item.id}`)
        return
      }

      await prisma.scores.create({
        data: {
          relevance: evaluation.relevance,
          impact: evaluation.impact,
          novelty: evaluation.novelty,
          reliability: evaluation.reliability,
          feed_items: { connect: { id: item.id } },
        },
      })

      await prisma.feed_items.update({
        where: { id: item.id },
        data: { title: evaluation.title, description: evaluation.content },
      })
    },
    { concurrency: 5 },
  )
}

if (require.main === module) {
  // This block will be executed if the script is run directly
  console.log("Script is running directly.")
  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
