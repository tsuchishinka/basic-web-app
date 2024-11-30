FROM node:20.11.1-alpine AS base

FROM base AS builder
WORKDIR /usr/app
RUN yarn global add turbo
COPY . .
RUN turbo prune express-server --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /usr/app/out/json/ .
RUN corepack enable yarn
RUN yarn install
COPY --from=builder /usr/app/out/full/ .
RUN yarn build
WORKDIR ./apps/express-server


# ENTRYPOINT ["tail", "-F", "/dev/null"]
CMD ["node", "dist/main.js"]