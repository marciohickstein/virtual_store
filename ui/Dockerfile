# Use an official Node.js LTS version as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

COPY vite.config.ts /app/vite.config.ts

# Install project dependencies
RUN npm install

# Install Vite globally
RUN npm install -g create-vite

# Copy the rest of your project files into the container
COPY . .

# Expose the port that Vite is running on (usually 3000)
EXPOSE 3000

# Command to start your Vite server
CMD ["npm", "run", "dev"]
