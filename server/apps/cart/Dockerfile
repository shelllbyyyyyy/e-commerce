FROM node:alpine AS development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package*.json ./
RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm run build cart

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package*.json ./
RUN pnpm install --prod --frozen-lockfile

RUN pnpm prune --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/cart/main"]
