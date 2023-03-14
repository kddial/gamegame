#!/bin/bash

# used to make localhost certs for development

mkcert -install
mkcert -cert-file ~/.gamegame/https.cert -key-file ~/.gamegame/https.key "gamegame.kevindial.com" "gamegame-production.up.railway.app" localhost 127.0.0.1 0.0.0.0 ::1
