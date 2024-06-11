# Use an official Node.js runtime as the base image
FROM node:18

# Install dos2unix to convert line endings
RUN apt-get update && apt-get install -y dos2unix

# Set the working directory in the Docker container for server
WORKDIR /usr/src/app/server

# Copy server package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the server application code to the working directory
COPY server .

# Generate Prisma Client for server
RUN npx prisma generate

# Build the server application
RUN npm run build

# Set the working directory in the Docker container for client
WORKDIR /usr/src/app/client

# Copy client package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install client dependencies
RUN npm install

# Copy the client application code to the working directory
COPY client .

# Build the client application
RUN npm run build

# Expose ports for the applications
EXPOSE 3000
EXPOSE 1234

# Copy and use a script to start both server and client
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Convert .env files to Unix format
RUN dos2unix /usr/src/app/server/.env /usr/src/app/client/.env

# Start both server and client
CMD ["/usr/src/app/start.sh"]
