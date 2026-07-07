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
