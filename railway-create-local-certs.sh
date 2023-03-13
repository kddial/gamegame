#!/bin/bash

# used to make localhost certs for development

./bin/mkcert-v1_4_4-linux-amd64 -install
./bin/mkcert-v1_4_4-linux-amd64 -cert-file ./certs/https.cert -key-file ./certs/https.key "gamegame.kevindial.com" localhost 127.0.0.1 ::1
