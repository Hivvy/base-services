FROM node:18-alpine

RUN mkdir -p /var/www/scraply
WORKDIR  /var/www/scraply
COPY . .

RUN npm install
RUN npm run build

EXPOSE 8000 

ENTRYPOINT ["node", "build/app.js"]