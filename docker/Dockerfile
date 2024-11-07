FROM node:20-alpine

RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY . .
RUN npm install
RUN npm run build


# Set environment variables
ENV DB_CONNECTION=""
ENV PORT=8000
ENV TOKEN_DURATION="30m"
ENV TOKEN_SECRET=""
ENV MAIL_HOST=""
ENV MAIL_PORT=""
ENV MAIL_USERNAME=""
ENV MAIL_PASSWORD=""

EXPOSE 8000 

CMD ["npm", "start"]