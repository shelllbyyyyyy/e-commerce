FROM node:alpine AS development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package*.json ./
RUN pnpm install

COPY . .

RUN pnpm run build root

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package*.json ./

RUN pnpm install --only=production

RUN pnpm prune --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/root/main"]