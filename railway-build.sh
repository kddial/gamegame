#!/bin/bash
# scripts for https://railway.app/

cd client
npm install
cd ..
cd server
npm install
npm run build

sudo ./copy-https-certs.sh