# Alpha Feed

Alpha Feed is a web application that aggregates RSS feeds and scores them based on certain metrics to surface the most important content for the day.

## Development

Start the development environment with `docker-compose`:

```
docker-compose up
```

Install dependencies with `yarn`:

```
cd app
yarn
```

You can then seed the database in the app directory

```
yarn prisma seed
```

Then go to `localhost:3000` to view the app. Changes will hot-reload.
