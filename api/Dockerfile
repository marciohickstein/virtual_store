FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install nodemon -g

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "debug" ]
