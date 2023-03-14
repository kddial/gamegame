#!/bin/bash
# scripts for https://railway.app/

echo "~~~~~~~~~~~~"
pwd
ls
echo 'certs'
ls certs
echo 'server'
ls server
echo 'server/dist'
ls server/dist
echo "~~~~~~~~~~~~"

cd server
cd dist
node index.js
