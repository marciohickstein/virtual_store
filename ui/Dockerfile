FROM node:18-alpine
#By default create-react-app sets port to 3000 when you start react app, but I configured to run ui on 8080 (just personal preference) instead of 3000.
RUN mkdir -p /app/public /app/src

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001 

CMD ["npm", "run", "dev"]