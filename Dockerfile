FROM node:15

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

