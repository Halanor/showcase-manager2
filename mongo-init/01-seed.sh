#!/usr/bin/env bash
set -euo pipefail
echo "Seeding MongoDB..."

mongoimport \
  --username "$MONGO_INITDB_ROOT_USERNAME" \
  --password "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --db admin \
  --collection showcases \
  --file /docker-entrypoint-initdb.d/showcases.json \
  --jsonArray --drop

mongoimport \
  --username "$MONGO_INITDB_ROOT_USERNAME" \
  --password "$MONGO_INITDB_ROOT_PASSWORD" \
  --authenticationDatabase admin \
  --db admin \
  --collection users \
  --file /docker-entrypoint-initdb.d/users.json \
  --jsonArray --drop

echo "Seeding done."
