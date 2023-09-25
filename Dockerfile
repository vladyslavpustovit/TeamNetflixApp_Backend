# Node Version
FROM node:18

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port
EXPOSE 8181

# Run Node.js application
CMD ["node", "app.js"]