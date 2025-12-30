# ------------------------------------------------------------------------------
# Stage 1: Builder
# Compiles the application and installs all dependencies
# ------------------------------------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies
# Copied first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy source code and build the application
COPY . .
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Runner
# Minimal runtime image with only production dependencies
# ------------------------------------------------------------------------------
FROM node:24-alpine AS runner

WORKDIR /app

# Optimize Node.js for production
ENV NODE_ENV=production

# Install production-only dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Security: Run as non-root user
USER node

# Start the application
CMD ["node", "dist/main.js"]