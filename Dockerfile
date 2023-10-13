# Node Version
FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk add --no-cache nmap && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Copy the rest of the application code to the working directory
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose a port
EXPOSE 8181

# Run Node.js application
CMD ["node", "app.js"]