import dotenv from "dotenv"
import express from "express"
import fs from "fs"
import handlebars from "handlebars"
import path from "path"
import { IFeedPost, SourceType } from "../interfaces/IFeedPost"
dotenv.config()

const app = express()
const port = 3001

const templatePath = process.env.EMAIL_TEMPLATE_PATH!

// Test data
const posts: IFeedPost[] = [
  {
    title: "New AI system shows remarkable improvement in protein folding predictions",
    body: "A team of researchers developed a deep neural network to predict protein folding with remarkable accuracy and speed, outperforming previous state-of-the-art methods. The research paper describing their method is published in the journal Nature. The team has also shared their code publicly for others to use. A video explaining their work is available.",
    scores: { significance: 9.3, relevance: 10, impact: 9, novelty: 9, reliability: 10 },
    media: ["https://nitter.net/pic/amplify_video_thumb%2F1662844490632052736%2Fimg%2FwC0Qi23gmCWw3Bcx.jpg"],
    externalLinks: ["https://www.nature.com/articles/s41586-023-06094-5#code-availability"],
    source: SourceType.Twitter,
    link: "https://nitter.net/dr_cintas/status/1662844560806952960#m",
    publishedAt: "2023-05-29T11:46:16.926Z",
  },
  {
    title: "Finetune a 65B parameter model on ONE GPU in ONE day",
    body: "You can finetune a 65B parameter model on one consumer GPU in one day using QLoRA, Paged optimizers, and Gradient checkpointing, which are easy to use.",
    scores: { significance: 9, relevance: 9, impact: 8, novelty: 10, reliability: 7 },
    media: ["https://nitter.net/pic/video.twimg.com%2Ftweet_video%2FFw-2HE4aEAcb0zh.mp4"],
    externalLinks: ["https://nitter.net/pic/tweet_video_thumb%2FFw-2HE4aEAcb0zh.jpg"],
    source: SourceType.Twitter,
    link: "https://nitter.net/marktenenholtz/status/1661747030606360580#maa",
    publishedAt: "2023-05-29T10:08:25.020Z",
  },
  {
    title: "OlaGPT: Empowering LLMs With Human-like Problem-Solving Abilities",
    body: "Introduces a novel intelligent framework, referred to as OlaGPT. OlaGPT carefully studied a cognitive architecture framework, and propose to simulate certain aspects of human cognition. The framework involves approximating different cognitive modules, including attention, memory, reasoning, learning, and corresponding scheduling and decision-making mechanisms. Inspired by the active learning mechanism of human beings, it proposes a learning unit to record previous mistakes and expert opinions, and dynamically refer to them to strengthen their ability to solve similar problems. The paper also outlines common effective reasoning frameworks for human problem-solving and designs Chain-of-Thought (COT) templates accordingly. A comprehensive decision-making mechanism is also proposed to maximize model accuracy. The efficacy of OlaGPT has been stringently evaluated on multiple reasoning datasets, and the experimental outcomes reveal that OlaGPT surpasses state-of-the-art benchmarks, demonstrating its superior performance.\nPaper page: https://huggingface.co/papers/2305.16334",
    scores: { significance: 9, relevance: 10, impact: 8, novelty: 9, reliability: 9 },
    media: ["https://nitter.net/pic/media%2FFxRg6zhWwAIXX9g.jpg"],
    externalLinks: ["https://huggingface.co/papers/2305.16334"],
    source: SourceType.Twitter,
    link: "https://nitter.net/_akhaliq/status/1663060831809028096#m",
    publishedAt: "2023-05-29T11:46:16.937Z",
  },
  {
    title: "LLMs Can Complete Sophisticated Action Trajectories",
    body: "LLM reads game's paper. Employs directed acyclic graph w/ game-related questions as nodes. Identifies optimal action by traversing DAG. W/ out training on game, outperforms all SoTA RL trained on game.",
    scores: { significance: 9, relevance: 10, impact: 9, novelty: 8, reliability: 9 },
    media: ["https://nitter.net/pic/media%2FFxD4qgdXgAETxfB.jpg"],
    externalLinks: ["https://arxiv.org/abs/2305.15486"],
    source: SourceType.Twitter,
    link: "https://nitter.net/johnjnay/status/1662102852817371137#m",
    publishedAt: "2023-05-29T11:46:17.025Z",
  },
  {
    title: "TII's Falcon 40B AI Model Ranked #1 Globally by Hugging Face",
    body: "Ranked #1 globally by Hugging Face, Falcon 40B is TII's open-source AI model with a remarkable 40 billion parameters that beats established names like LLaMA from Meta, including its 65B model, StableLM from Stability AI, and RedPajama from Together. Visit FalconLLM.TII.ae.",
    scores: { significance: 9, relevance: 9, impact: 8, novelty: 10, reliability: 9 },
    media: ["https://nitter.net/pic/media%2FFxEtDy-WAAATkOU.jpg"],
    externalLinks: ["http://FalconLLM.TII.ae"],
    source: SourceType.Twitter,
    link: "https://nitter.net/TIIuae/status/1662159306588815375#m",
    publishedAt: "2023-05-29T11:46:16.994Z",
  },
]

const date = new Date().toLocaleDateString()

console.log(`Template path: ${templatePath}`)

app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../", templatePath), "utf8", (err, data) => {
    if (err) throw err

    // Compile and render the template with the test data
    const template = handlebars.compile(data)
    const html = template({ posts, date })

    res.send(html)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
