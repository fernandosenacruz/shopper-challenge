FROM node:20-alpine
WORKDIR /back-end

COPY package*.json ./

RUN npm install
COPY . .

ENTRYPOINT [ "sh", "-c" ,"npm start" ]
EXPOSE 8080