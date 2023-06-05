import { evaluateContent } from "../jobs/score"
import { computeSignificance } from "../utils/eval"

async function test() {
  const casesMap = {
    [`Low score with link`]: `<p>Check out this blog post by Luis Serrano on sentence similarity! He dives into the importance of embeddings in large language models &amp; explains dot product and cosine similarity. Add some excitement to your tech reads!🚀💻 Read more: <br>
    <a href="https://txt.cohere.com/what-is-similarity-between-sentences/">txt.cohere.com/what-is-simil…</a></p>
    <img src="https://nitter.net/pic/card_img%2F1663354894710099968%2FW3DK98eP%3Fformat%3Djpg%26name%3D800x419" style="max-width:250px;" />`,
    [`High score 1`]: `<p>Announcing 🧠👁️ MindEye! <br>
    <br>
    Our state-of-the-art fMRI-to-image approach that retrieves &amp; reconstructs images from brain activity, is out as a preprint!<br>
    <br>
    MindEye takes human brain activity as input and outputs reconstructed images like these.<br>
    <br>
    Project page: <a href="https://medarc-ai.github.io/mindeye/">medarc-ai.github.io/mindeye/</a></p>
    <img src="https://nitter.net/pic/media%2FFxVqzc_WwAEfjr1.jpg" style="max-width:250px;" />`,
    [`High score 2`]: `<p>MERT: Acoustic Music Understanding Model with Large-Scale Self-supervised Training<br>
    <br>
    paper page: <a href="https://huggingface.co/papers/2306.00107">huggingface.co/papers/2306.0…</a><br>
    <br>
    propose an acoustic Music undERstanding model with large-scale self-supervised Training (MERT), which incorporates teacher models to provide pseudo labels in the masked language modelling (MLM) style acoustic pre-training. In our exploration, we identified a superior combination of teacher models, which outperforms conventional speech and audio approaches in terms of performance. This combination includes an acoustic teacher based on Residual Vector Quantization - Variational AutoEncoder (RVQ-VAE) and a musical teacher based on the Constant-Q Transform (CQT). These teachers effectively guide our student model, a BERT-style transformer encoder, to better model music audio. In addition, we introduce an in-batch noise mixture augmentation to enhance the representation robustness. Furthermore, we explore a wide range of settings to overcome the instability in acoustic language model pre-training, which allows our designed paradigm to scale from 95M to 330M parameters. Experimental results indicate that our model can generalise and perform well on 14 music understanding tasks and attains state-of-the-art (SOTA) overall scores.</p>
    <img src="https://nitter.net/pic/media%2FFxlhXakX0AAcZSD.jpg" style="max-width:250px;" />`,
    [`Not interesting`]: `<p>A very good interview with <a href="https://nitter.net/kchonyc" title="Kyunghyun Cho">@kchonyc</a>.  I pretty much agree with the viewpoints he expressed in the interview.<br>
    <a href="https://venturebeat.com/ai/top-ai-researcher-dismisses-ai-extinction-fears-challenges-hero-scientist-narrative/">venturebeat.com/ai/top-ai-re…</a></p>
   <img src="https://nitter.net/pic/card_img%2F1664316514017726465%2F_iHEAHcy%3Fformat%3Djpg%26name%3D800x419" style="max-width:250px;" />`,
  }

  for (const [name, content] of Object.entries(casesMap)) {
    const evaluation = await evaluateContent(content)
    if (!evaluation) {
      console.log(name, "no evaluation")
      continue
    }
    const significance = computeSignificance(evaluation)
    console.log(name, significance, {
      novelty: evaluation.novelty,
      relevance: evaluation.relevance,
      reliability: evaluation.reliability,
      impact: evaluation.impact,
    })
    console.log("")
  }
}

test()
