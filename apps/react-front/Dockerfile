FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
COPY . .
RUN corepack enable yarn
RUN yarn install
RUN yarn prune:react-front

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json .
RUN corepack enable yarn
RUN yarn install
COPY --from=builder /app/out/full .
RUN yarn build:react-front
RUN ls -l

FROM nginx:alpine
COPY --from=installer ./app/apps/react-front/dist /var/www
COPY ./apps/react-front/nginx /etc/nginx/conf.d/
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]