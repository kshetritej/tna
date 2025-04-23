#!/bin/bash

mkdir -p deployment

cp package.json deployment/
cp package-lock.json deployment/

npm run build

cp -r dist/* deployment/

npx prisma generate

mkdir -p deployment/node_modules/.prisma
cp -r node_modules/.prisma/client deployment/node_modules/.prisma/
cp -r node_modules/@prisma/client deployment/node_modules/@prisma/

# Install production dependencies (including aws-sdk)
cd deployment
npm install --production

zip -r ../deployment.zip .
cd ..

echo "Deployment package created: deployment.zip"

