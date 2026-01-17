# Base stage - common setup for both dev and prod
ARG TARGETPLATFORM=linux/amd64
FROM --platform=${TARGETPLATFORM} node:24-slim AS base

SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get upgrade -y \
    && apt-get install procps -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/node/app

# Development stage
FROM base AS development

USER node

CMD test -d "node_modules" && npm run start:dev || npm i && npm run start:dev

# Builder stage - for compiling the application
FROM base AS builder

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM base AS production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /home/node/app/dist ./dist

USER node

CMD ["node", "dist/main.js"]

