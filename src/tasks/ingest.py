from sqlalchemy import exc
from models.database import Session
from models import FeedItem
import feedparser
from tqdm import tqdm


def main():
    # Parse the RSS feed
    print("Parsing RSS feed")
    d = feedparser.parse("https://nitter.net/i/lists/1660595980486492162/rss")

    print("Inserting into the database")
    # Open a new session
    session = Session()

    # Loop over each entry
    for entry in d.entries:
        feed_item = FeedItem(
            title=entry.title,
            link=entry.link,
            description=entry.description,
            published=entry.published,
            author=entry.author
        )

        session.add(feed_item)
        try:
            session.commit()
            print(f"Inserted {entry.title[:10]}... into the database.")
        except exc.IntegrityError:
            print(f"{entry.title[:10]}... is already in the database.")
            session.rollback()

    # Close the session
    session.close()


if __name__ == "__main__":
    main()
