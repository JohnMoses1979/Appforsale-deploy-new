FROM node:20

WORKDIR /app

COPY package*.json ./


RUN npm install --legacy-peer-deps

RUN npm install -g expo-cli


COPY . .

EXPOSE 8081


CMD ["npx", "expo", "start", "--tunnel"]
