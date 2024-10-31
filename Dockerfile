FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env.prd .env

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
