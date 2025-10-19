# Production Dockerfile for Next.js app (Node 20)
FROM node:20-bullseye-slim AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
RUN corepack enable
COPY package.json package-lock.json* ./
COPY pnpm-lock.yaml .
RUN npm ci --prefer-offline --no-audit --progress=false || true

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
