# stage 1 builder
FROM node:alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm run build product

# stage 2 production
FROM node:alpine AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm prune --prod

RUN pnpm add prisma --global

CMD ["node", "dist/apps/product/main"]