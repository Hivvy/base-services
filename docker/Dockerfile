FROM node:20-alpine

RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY ./ .
RUN npm install
RUN npm run build


# Set environment variables
ENV DB_CONNECTION="mongodb+srv://Ayobami:KDrhX05TmMl3OrGa@cluster0.flpzloz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ENV PORT=8000
ENV TOKEN_DURATION="30m"
ENV TOKEN_SECRET="TestingScraply@2020"
ENV MAIL_HOST=sandbox.smtp.mailtrap.io
ENV MAIL_PORT=2525
ENV MAIL_USERNAME="a62410a30b6607"
ENV MAIL_PASSWORD="db44c762c452b8"

EXPOSE 8000 

ENTRYPOINT ["node", "build/app.js"]