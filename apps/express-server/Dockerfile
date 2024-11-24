FROM node:20.11.1-alpine

WORKDIR /usr/src/app


COPY . .
RUN corepack enable
RUN yarn install
RUN yarn build

EXPOSE 8000
CMD ["node", "dist/main.js"]