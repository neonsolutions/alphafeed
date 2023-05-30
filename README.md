# Alpha Feed

Alpha Feed is a web application that aggregates RSS feeds and scores them based on certain metrics to surface the most important content for the day.

## Development

Start the development environment with `docker-compose`. This will start and prepare the database.

```
docker-compose up
```

Install dependencies with `yarn`:

```
cd app
yarn
```

You can then run the next app with:

```
yarn dev
```

Then go to `localhost:3000` to view the app.

### Stripe

To listen for stripe webhooks, run the following command:

```
yarn stripe:listen
```

## Jobs

### Ingest

Ingest content from RSS feeds.

```
yarn job:ingest
```

### Score

Score unscored content.

```
yarn job:score
```

### Newsletter

Send out the daily newsletter to subscribers.

```
yarn job:newsletter
```
