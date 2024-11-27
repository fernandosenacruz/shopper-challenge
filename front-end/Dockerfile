FROM node:20-alpine AS build
WORKDIR /front-end

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /front-end
RUN npm install -g serve
COPY --from=build /front-end/build /front-end/build
CMD ["serve", "-s", "build", "-l", "80"]
EXPOSE 80
