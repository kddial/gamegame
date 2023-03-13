#!/bin/bash
# scripts for https://railway.app/

sudo ./railway-create-local-certs.sh

cd client
npm install
cd ..
cd server
npm install
npm run build
