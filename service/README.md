# Alpha-Feed Scheduler

Alpha-Feed scheduler is a set of tasks that run periodically to ingest RSS feeds, store them in a database, and score them based on certain metrics.

## Requirements

- Python 3.6 or higher
- SQLAlchemy
- Alembic
- feedparser

## Setup

Install the necessary dependencies using `pipenv`:

```
pipenv install
```

Activate the pipenv shell

```
pipenv shell
```

## Usage

Run the ingestion script to fetch new RSS feed items and store them in the database:

First cd into the `src/` directory:

```
cd src/
```

Then run the ingestion task:

```
python -m tasks.ingest
```

Then run the scoring task:

```
python -m tasks.analyze
```

## Models

The SQLAlchemy models are defined in the `models/` directory. `feed_item.py` defines the `FeedItem` model for RSS feed items, and `scores.py` defines the Scores model for scoring feed items.

## Tasks

Scripts for regular tasks are stored in the `tasks/` directory. Currently, the main task is `ingest.py`, which fetches new items from the RSS feed and stores them in the database.
