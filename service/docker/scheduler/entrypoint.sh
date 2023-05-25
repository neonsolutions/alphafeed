#!/bin/sh

while true; do
    if nc -z dev-web 3000; then
        echo "dev-web is up and running"
        break
    else
        echo "dev-web is not available yet, sleeping for 1 second"
        sleep 1
    fi
done

# python -m scheduler
