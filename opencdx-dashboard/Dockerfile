# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Set port
ENV PORT=3005

# Copy package.json and package-lock.json to the working directory
COPY package*.json yarn.lock ./

# Install app dependencies
RUN npm install -g serve
RUN yarn install

# Copy the local source code to the container
COPY . .

RUN npm run build

# Expose port 3005 to the outside world
EXPOSE 3005

# Command to run the application
CMD serve -s --ssl-cert /certs/Dashboard-cert.pem --ssl-key /certs/Dashboard-key.pem build -l 3005