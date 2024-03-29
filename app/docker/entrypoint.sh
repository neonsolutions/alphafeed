while true; do
    if nc -z dev-db 5432; then
        echo "dev-db is up and running"
        break
    else
        echo "dev-db is not available yet, sleeping for 1 second"
        sleep 1
    fi
done

yarn prisma migrate dev --skip-generate

yarn prisma db seed