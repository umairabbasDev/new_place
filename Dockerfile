# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the container
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN npm i pnpm -g
# RUN npm install serve -g
RUN pnpm install
# Copy the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Define the command to run your app
CMD ["pnpm", "dev"]
