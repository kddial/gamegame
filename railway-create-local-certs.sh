#!/bin/bash

# used to make localhost certs for development

mkdir -p ./certs
./bin/mkcert-v1_4_4-linux-amd64 -install
./bin/mkcert-v1_4_4-linux-amd64 -cert-file ./certs/https.cert -key-file ./certs/https.key "gamegame.kevindial.com" "gamegame-production.up.railway.app" localhost 127.0.0.1 0.0.0.0 ::1
