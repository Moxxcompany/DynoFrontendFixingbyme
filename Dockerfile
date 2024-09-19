FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm build
CMD [ "npm","start" ]