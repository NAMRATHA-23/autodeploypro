# Start from official Node.js 18 Alpine image
# Alpine = tiny Linux distro, keeps image size small
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files FIRST (layer caching trick)
# If package.json hasn't changed, npm ci is cached
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app code
COPY . .

# Tell Docker this container listens on port 3000
EXPOSE 3000

# Command to run when container starts
CMD ["node", "src/index.js"]