# Use official Node.js runtime as parent image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code, including data.json and public folder
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD [ "node", "server.js" ]
