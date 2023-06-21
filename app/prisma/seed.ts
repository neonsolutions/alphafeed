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

  const samplePostData3 = {
    id: "b476bec2-447f-477d-83bc-2454541af2ce",
    title_raw:
      "RT by @Teknium1: MIT used a LLM for protein-drug interactions, making it possible to screen large libraries of more than 100 million drug compounds. Anne Trafton v/@mitsmr #DrugDiscovery cc @enilev @Nicochan33 @JagersbergKnut  @tobiaskintzel @AkwyZ @jeancayeux @antgrasso https://news.mit.edu/2023/new-model-offers-speedy-drug-discovery-0608",
    title: "MIT Develops LLM for Faster Drug Discovery",
    link: "https://nitter.net/IanLJones98/status/1671177537240682500#m",
    description_raw:
      '<p>MIT used a LLM for protein-drug interactions, making it possible to screen large libraries of more than 100 million drug compounds. Anne Trafton v/<a href="https://nitter.net/mitsmr" title="MIT Sloan Management Review">@mitsmr</a> <a href="https://nitter.net/search?q=%23DrugDiscovery">#DrugDiscovery</a> cc <a href="https://nitter.net/enilev" title="Eveline Ruehlin">@enilev</a> <a href="https://nitter.net/Nicochan33" title="Nicolas Babin">@Nicochan33</a> <a href="https://nitter.net/JagersbergKnut" title="Knut Jägersberg">@JagersbergKnut</a>  <a href="https://nitter.net/tobiaskintzel" title="Tobias Kintzel">@tobiaskintzel</a> <a href="https://nitter.net/AkwyZ" title="Antonio Vieira Santos">@AkwyZ</a> <a href="https://nitter.net/jeancayeux" title="Jean 💖🐾 CAYEUX IT 🇫🇷">@jeancayeux</a> <a href="https://nitter.net/antgrasso" title="Antonio Grasso">@antgrasso</a> <a href="https://news.mit.edu/2023/new-model-offers-speedy-drug-discovery-0608">news.mit.edu/2023/new-model-…</a></p>\n<img src="https://nitter.net/pic/card_img%2F1668625284218904582%2FyUI5oMUC%3Fformat%3Djpg%26name%3D800x419" style="max-width:250px;" />',
    description:
      "MIT has developed a new LLM that can screen large libraries of over 100 million drug compounds for protein-drug interactions. This new model significantly speeds up drug discovery.",
    published: new Date(),
    author: "@IanLJones98",
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

  await prisma.feed_items.create({
    data: samplePostData3,
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
