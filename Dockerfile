# Step 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies and install
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the project files
COPY . .

# Build the app
RUN yarn build

# Step 2: Run the app in a lighter container
FROM node:18-alpine AS runner

WORKDIR /app

ENV ENV NODE_ENV=production

# Copy only necessary files for running the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
