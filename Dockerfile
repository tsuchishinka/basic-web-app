FROM mongo:7.0-jammy

ENV LANG=ja_JP.UTF-8
COPY apps/mongo/init_db.js /docker-entrypoint-initdb.d/

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash - && apt-get install -y nodejs

WORKDIR /usr/app

COPY . .
RUN cp apps/mongo/init_db.js /docker-entrypoint-initdb.d/
RUN npm i -g corepack
RUN corepack enable yarn
RUN yarn install
WORKDIR apps/express-server
RUN yarn build

EXPOSE 27017
EXPOSE 80

CMD ["node", "dist/main.js"]