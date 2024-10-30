FROM node:20-alpine

# Create app directory
RUN mkdir -p /var/www/html

WORKDIR /var/www/html

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
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