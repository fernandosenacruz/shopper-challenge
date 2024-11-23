FROM node:20-alpine
WORKDIR /back-end
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT [ "sh", "-c" ,"npm run seed && npm start" ]