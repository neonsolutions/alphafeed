import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Start seeding...")

  // Seed posts
  const samplePostData1 = {
    title_raw: `RT by @Tim_Dettmers: Think about how crazy this is:

    You can finetune a 65B parameter model (50% of GPT-3) on ONE consumer GPU in ONE day.
    
    If you don't have an A6000, then 2 3090's will do (~$1600).
    
    All you need is:
    
    • QLoRA
    • Paged optimizers
    • Gradient checkpointing
    
    And they're easy to use.`,
    title: `Finetune a 65B parameter model on ONE GPU in ONE day`,
    link: "https://nitter.net/marktenenholtz/status/1661747030606360580#maa",
    description_raw: `<p>Think about how crazy this is:<br />
    <br />
    You can finetune a 65B parameter model (50% of GPT-3) on ONE consumer GPU in ONE day.<br />
    <br />
    If you don't have an A6000, then 2 3090's will do (~$1600).<br />
    <br />
    All you need is:<br />
    <br />
    • QLoRA<br />
    • Paged optimizers<br />
    • Gradient checkpointing<br />
    <br />
    And they're easy to use.</p>
    <video loop="loop" poster="https://nitter.net/pic/tweet_video_thumb%2FFw-2HE4aEAcb0zh.jpg">
      <source src="https://nitter.net/pic/video.twimg.com%2Ftweet_video%2FFw-2HE4aEAcb0zh.mp4" type="video/mp4" /></video>`,
    description: `You can finetune a 65B parameter model on one consumer GPU in one day using QLoRA, Paged optimizers, and Gradient checkpointing, which are easy to use.`,
    published: new Date(),
    author: "@marktenenholtz",
    scores: {
      create: {
        relevance: 9,
        impact: 8,
        novelty: 10,
        reliability: 7,
      },
    },
  }

  const samplePostData2 = {
    title_raw: `LLMs as Factual Reasoners: Insights from Existing Benchmarks and Beyond

propose a new protocol for inconsistency detection benchmark creation and implement it in a 10-domain benchmark called SummEdits. This new benchmark is 20 times more cost-effective per sample than previous benchmarks and highly reproducible, as we estimate inter-annotator agreement at about 0.9. Most LLMs struggle on SummEdits, with performance close to random chance. The best-performing model, GPT-4, is still 8\% below estimated human performance, highlighting the gaps in LLMs' ability to reason about facts and detect inconsistencies when they occur

paper page: https://huggingface.co/papers/2305.14540`,
    title: `LLMs Struggle with Reasoning about Facts and Inconsistency Detection`,
    link: "https://nitter.net/_akhaliq/status/1661583348521918464#maa",
    description_raw: `<p>LLMs as Factual Reasoners: Insights from Existing Benchmarks and Beyond<br />
<br />
propose a new protocol for inconsistency detection benchmark creation and implement it in a 10-domain benchmark called SummEdits. This new benchmark is 20 times more cost-effective per sample than previous benchmarks and highly reproducible, as we estimate inter-annotator agreement at about 0.9. Most LLMs struggle on SummEdits, with performance close to random chance. The best-performing model, GPT-4, is still 8\% below estimated human performance, highlighting the gaps in LLMs' ability to reason about facts and detect inconsistencies when they occur<br />
<br />
paper page: <a href="https://huggingface.co/papers/2305.14540">huggingface.co/papers/2305.1…</a></p>
<img src="https://nitter.net/pic/media%2FFw8hOjgaQAACIuI.jpg" />`,
    description: `This paper proposes a new protocol for inconsistency detection benchmark creation and introduces SummEdits, a 10-domain benchmark that is 20 times more cost-effective per sample than previous benchmarks and highly reproducible. The best-performing LLM model, GPT-4, is still 8% below estimated human performance in detecting inconsistencies and reasoning about facts in SummEdits.`,
    published: new Date(),
    author: "@_akhaliq",
    scores: {
      create: {
        relevance: 8,
        impact: 8,
        novelty: 9,
        reliability: 9,
      },
    },
  }

  await prisma.feed_items.create({
    data: samplePostData1,
  })

  await prisma.feed_items.create({
    data: samplePostData2,
  })

  console.log("Seeding completed.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
