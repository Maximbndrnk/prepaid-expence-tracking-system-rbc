#!/usr/bin/env bash

database="petsdb"

echo "Configure database: $database"

dropdb -U postgres petsdb
createdb -U postgres petsdb

psql -U postgres  petsdb < ./db/database.sql

echo "$database configured"
