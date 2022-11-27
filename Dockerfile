FROM node:16
RUN npm install -g npm@9.1.2
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENTRYPOINT [ "npm", "run", "start-container" ]
