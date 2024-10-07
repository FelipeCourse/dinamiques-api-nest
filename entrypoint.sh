#!/bin/sh

set -e

PROTOCOL=${DATABASE_PROTOCOL:-postgres}
HOST=${DATABASE_HOST:-postgres}
PORT=5432
TIMEOUT=60
WAIT_INTERVAL=1

echo "Waiting for the database at ${HOST}:${PORT} to become available..."

COUNTER=0

while ! nc -z "$HOST" "$PORT"; do
  if [ "$COUNTER" -ge "$TIMEOUT" ]; then
    echo "Timeout reached: database did not become available after ${TIMEOUT} seconds."
    exit 1
  fi
  echo "Database is not available yet. Retrying in ${WAIT_INTERVAL} seconds..."
  sleep "$WAIT_INTERVAL"
  COUNTER=$((COUNTER + WAIT_INTERVAL))
done

echo "Database is available."

echo "Deploying prisma migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma
echo "Migrations deployed successfully."

echo "Seeding the database if necessary..."
node ./prisma/seeds/seed.mjs
echo "Database seeded successfully."
