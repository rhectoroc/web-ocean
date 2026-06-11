# Stage 1: Build the Frontend
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the frontend (React + Vite)
RUN npm run build

# Stage 2: Serve the Static Frontend
FROM node:20-alpine

WORKDIR /app

# Install 'serve' globally to host the static files
RUN npm install -g serve

# Copy the built assets from the previous stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the server (serve handles Single Page Apps routing with -s)
CMD ["serve", "-s", "dist", "-l", "3000"]
