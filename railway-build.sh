#!/bin/bash
# scripts for https://railway.app/

sudo ./copy-https-certs.sh

cd client
npm install
cd ..
cd server
npm install
npm run build
