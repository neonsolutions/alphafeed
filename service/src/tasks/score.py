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
        {"role": "user", "content": f"Please evaluate this raw content: {content}. ONLY respond with valid JSON in the desired format, DO NOT UNDER ANY CIRCUMSTANCES add extra text, explanation, or notes"}
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
    result = None
    try:
        result = json.loads(evaluation)
        # Convert scores to float
        score_keys = ["relevance", "impact", "novelty", "reliability"]
        for key in score_keys:
            result[key] = float(result[key])

        result["title"]
        result["content"]

    except (json.decoder.JSONDecodeError, KeyError, ValueError) as e:
        print(e)
        print("Retrying (JSON)")
        result = analyze_content(content)

    return result


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

    for i in [example_ignore, example_relevant]:
        print(i)
        print(analyze_content(i))
        print("-----")


def main():
    session = Session()

    items_without_score = session.query(FeedItem).outerjoin(
        Scores).filter(Scores.id == None).all()

    print(f"Found {len(items_without_score)} items without scores")

    for item in tqdm(items_without_score):
        evaluation = analyze_content(item.description_raw)
        scores = Scores(relevance=evaluation["relevance"],
                        impact=evaluation["impact"],
                        novelty=evaluation["novelty"],
                        reliability=evaluation["reliability"])
        item.scores = scores
        item.description = evaluation["content"]
        item.title = evaluation["title"]
        session.add(item)
        session.commit()


if __name__ == "__main__":
    # main()
    test()
