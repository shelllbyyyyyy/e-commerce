FROM node:alpine AS development

WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN apk add --no-cache python3 make g++

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package*.json ./ 
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

CMD ["pnpm", "start:dev product"]