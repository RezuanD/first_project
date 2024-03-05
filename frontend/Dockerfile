FROM node:20.11.1

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install --verbose
 
COPY . .  
