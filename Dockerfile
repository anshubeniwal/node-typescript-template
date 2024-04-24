FROM node:18.12.1-alpine

# puppeteer require chromium which doesn't get installed on ARM64 silicon (e.g. M1)
# hence the apk add and the ENV statements are required
RUN apk add --no-cache chromium \
    && rm -rf /var/cache/apk/* /tmp/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/app

COPY tsconfig.json ./
COPY ./package*.json ./

# RUN npm install npm@latest
RUN npm i

CMD ['node']
