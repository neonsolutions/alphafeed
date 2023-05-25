from sqlalchemy import exc
from models.database import Session
from models import FeedItem
import feedparser
from tqdm import tqdm
from datetime import datetime


def main():
    # Parse the RSS feed
    print("Fetching RSS feed")
    d = feedparser.parse("https://nitter.net/i/lists/1660595980486492162/rss")

    print(f"Processing {len(d.entries)} items")
    # Open a new session
    session = Session()

    inserted_count = 0
    skipped_count = 0

    # Loop over each entry
    for entry in d.entries:
        date_format = "%a, %d %b %Y %H:%M:%S %Z"
        parsed_time = datetime.strptime(
            entry.published, date_format)
        feed_item = FeedItem(
            title_raw=entry.title,
            link=entry.link,
            description_raw=entry.description,
            published=parsed_time,
            author=entry.author
        )

        session.add(feed_item)
        try:
            session.commit()
            inserted_count += 1
        except exc.IntegrityError:
            skipped_count += 1
            session.rollback()

    print(f"Inserted {inserted_count} items, skipped {skipped_count} items")

    # Close the session
    session.close()


if __name__ == "__main__":
    main()
