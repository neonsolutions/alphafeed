# Set the base image
FROM python:3.11-alpine

# Set the working directory
WORKDIR /app

# Install pipenv and psycopg2 dependencies
RUN apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev \
    && pip install pipenv psycopg2-binary

# Copy the Pipfile and Pipfile.lock file
COPY Pipfile Pipfile.lock /app/

# Install dependencies with pipenv
RUN pipenv install --deploy --system

# Copy the rest of the application files into the working directory
COPY src /app/src
COPY alembic /app/alembic
COPY alembic.ini /app/alembic.ini

COPY docker/scheduler/entrypoint.sh /app/entrypoint.sh

# Change to src directory
# WORKDIR /app/src
