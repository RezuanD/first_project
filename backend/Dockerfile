FROM node:21.6.1-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --verbose
COPY . .

RUN npm run build

########

FROM node:21.6.1-alpine as dev

ARG NODE_ENV=builder
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules /usr/src/app/

COPY . .
COPY --from=builder /usr/src/app/dist ./dist
