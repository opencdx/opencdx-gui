FROM node:20-alpine AS base


COPY /dist /app/dist

COPY serve.json /app/dist

WORKDIR /app

RUN npm install --global serve

CMD npx serve dist