# 1. Use an official Node.js runtime as a base image
FROM node:18

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your code
COPY . .

# 5. Set environment variable (can be passed at runtime or from GitHub Actions)
ENV OPENAI_API_KEY=${OPENAI_API_KEY}

# 6. Expose the application port (adjust if your app uses another port)
EXPOSE 3000

# 7. Define the command to run your app (ensure you have a start script in package.json)
CMD ["npm", "start"]