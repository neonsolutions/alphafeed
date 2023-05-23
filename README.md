# Alpha-Feed Project

Alpha-Feed is a project designed to ingest RSS feeds, store them in a database, and score them based on certain metrics.

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

Set up the database:

```
alembic upgrade head
```

## Usage

Run the ingestion script to fetch new RSS feed items and store them in the database:

First cd into the `src/` directory:

```
cd src/
```

Then run the script:

```
python -m tasks.ingest
```

## Database

The project uses SQLite as its database, stored in `rss_feed.db`.

You can inspect the database using an SQLite client. For example, with the sqlite3 command line tool:

```
sqlite3 rss_feed.db
```

Then, in the sqlite3 prompt, you can use SQL commands to query the database, e.g.:

```
SELECT \* FROM feed_items;
```

### Database Migrations

We use Alembic for database migrations. The most common commands are:

To generate a new migration script:

```
alembic revision -m "description of your revision" --autogenerate
```

To apply all pending migrations:

```
alembic upgrade head
```

To downgrade the last applied migration:

```
alembic downgrade -1
```

## Models

The SQLAlchemy models are defined in the `models/` directory. `feed_item.py` defines the `FeedItem` model for RSS feed items, and `scores.py` defines the Scores model for scoring feed items.

## Tasks

Scripts for regular tasks are stored in the `tasks/` directory. Currently, the main task is `ingest.py`, which fetches new items from the RSS feed and stores them in the database.
