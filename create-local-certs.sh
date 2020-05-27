#!/bin/bash

# used to make localhost certs for development

mkcert -install
mkcert -cert-file ~/.gamegame/localhost.cert -key-file ~/.gamegame/localhost.key localhost 127.0.0.1 ::1
