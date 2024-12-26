# FROM node:20.11.1-alpine
FROM mongo:7.0-jammy

ENV LANG=ja_JP.UTF-8

COPY mongo/init_db.js /docker-entrypoint-initdb.d/

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash - && apt-get install -y nodejs

WORKDIR /usr/src/app

COPY . .
RUN npm i -g corepack
RUN corepack enable
RUN yarn install
RUN yarn build

EXPOSE 8000
CMD ["node", "dist/main.js"]