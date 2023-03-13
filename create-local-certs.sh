#!/bin/bash

# used to make localhost certs for development

mkcert -install
mkcert -cert-file ~/.gamegame/https.cert -key-file ~/.gamegame/https.key "gamegame.kevindial.com" localhost 127.0.0.1 ::1
