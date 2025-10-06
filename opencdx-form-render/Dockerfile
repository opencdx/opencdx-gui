FROM node:20-alpine AS base

# Update OpenSSL to fix vulnerabilities CVE-2025-9230, CVE-2025-9231, CVE-2025-9232
RUN apk update && apk upgrade openssl libcrypto3 libssl3

COPY /dist /app/dist

COPY serve.json /app/dist

WORKDIR /app

RUN npm install --global serve

CMD npx serve dist