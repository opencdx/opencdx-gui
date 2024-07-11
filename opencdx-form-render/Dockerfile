# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Set port
ENV PORT=19006

# Copy package.json and package-lock.json to the working directory
COPY package*.json yarn.lock ./

# Install app dependencies
RUN npm install -g serve
RUN yarn install

# Copy the local source code to the container
COPY . .

# Expose port 3005 to the outside world
EXPOSE 19006

# Command to run the application
CMD npm run web