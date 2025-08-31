#!/bin/sh
set -e

HOST="http://127.0.0.1:5984"
DBS="users"

echo "Esperando a CouchDB..."
for i in $(seq 1 30); do
  if curl -fsS "$HOST/_up" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "Creando DBs..."
for db in $DBS; do
  curl -fsS -X PUT -u "$COUCHDB_USER:$COUCHDB_PASSWORD" "$HOST/$db" || true
done

echo "✔ CouchDB inicializado"
