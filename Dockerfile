# syntax=docker/dockerfile:1
# Multi-stage Dockerfile for the Creative Manager Backend (Node.js / TypeScript)

# --- DEPENDENCIES STAGE ---
FROM node:22-alpine AS deps

WORKDIR /app

# Copy manifest files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci

# --- BUILD STAGE ---
FROM deps AS builder

WORKDIR /app

# Copy source files
COPY tsconfig.json ./
COPY src/ ./src/

# Compile TypeScript → dist/
RUN npm run build

# --- PRODUCTION RUNTIME ---
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy manifest files and install ONLY production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]

# --- DEVELOPMENT RUNTIME ---
FROM deps AS development

WORKDIR /app

ENV NODE_ENV=development

# Copy all source files into the container
COPY tsconfig.json ./
COPY src/ ./src/

EXPOSE 3000

# ts-node-dev watches for changes and restarts automatically
CMD ["npm", "run", "dev"]
