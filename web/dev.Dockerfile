# Stage 1: Development
FROM node:alpine AS development

WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN apk add --no-cache python3 make g++

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]

