import json
import openai
from .prompts import analyze_content_system_prompt
import os
from sqlalchemy.orm import joinedload
from sqlalchemy import or_
from models.database import Session
from models import FeedItem, Scores
from tqdm import tqdm


openai.api_key = os.getenv("OPENAI_KEY")

AUDIENCE_DESCRIPTION = "The target audience is a group of people who are interested in the topic of artificial intelligence research and are looking for the latest state of the art developments in the field. Prioritize research breakthroughs, new discoveries, and novel applications of AI."
MAX_RETRIES = 10


def analyze_content(content: str) -> dict:
    system_prompt = analyze_content_system_prompt(AUDIENCE_DESCRIPTION)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Please evaluate this content: {content}. ONLY respond with valid JSON in the desired format, DO NOT UNDER ANY CIRCUMSTANCES add extra text, explanation, or notes"}
    ]
    tries = 0
    response = None
    while tries < MAX_RETRIES:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            break
        except openai.error.OpenAIError as e:
            print(e)
            tries += 1
            print("Retrying")
            continue

    if response is None:
        raise Exception("ChatGPT failed to respond")

    evaluation = response["choices"][0]["message"]["content"]

    # Retry if the response is not valid JSON
    scores = None
    try:
        scores = json.loads(evaluation)
        # Convert scores to float
        for key in scores["scores"]:
            scores["scores"][key] = float(scores["scores"][key])
    except json.decoder.JSONDecodeError:
        print("Retrying (JSON)")
        scores = analyze_content(content)

    return scores


def test():
    example_ignore = """#ALIFE2023 is hosting workshops!

“Alife for and from video games” focuses on insights that ALIFE and video games give to each.

Check the link for details!
2023.alife.org/programme/wor…"""

    example_relevant = """MMS: Massively Multilingual Speech.
- Can do speech2text and text speech in 1100 languages.
- Can recognize 4000 spoken languages.
- Code and models available under the CC-BY-NC 4.0 license.
- half the word error rate of Whisper.

Code+Models: github.com/facebookresearch/…
Paper: scontent-lga3-2.xx.fbcdn.net…
Blog: ai.facebook.com/blog/multili…"""

    score_ignore = analyze_content(example_ignore)

    score_relevant = analyze_content(example_relevant)

    print("ignore", score_ignore)
    print("relevant", score_relevant)


def main():
    session = Session()

    items_without_score = session.query(FeedItem).outerjoin(
        Scores).filter(Scores.id == None).all()

    print("hello")

    for item in tqdm(items_without_score):
        print(
            f"Item ID: {item.id}, Item Title: {item.title[:10]}..., Scores: {item.scores}")
        scores_dict = analyze_content(item.description)["scores"]
        scores = Scores(relevance=scores_dict["relevance"],
                        impact=scores_dict["impact"],
                        novelty=scores_dict["novelty"],
                        reliability=scores_dict["reliability"])
        item.scores = scores
        session.add(item)
        session.commit()


if __name__ == "__main__":
    main()
