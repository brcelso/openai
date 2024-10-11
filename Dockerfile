# Use an official base image (e.g., Node.js)
FROM node:14

# Set the working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "build"]
