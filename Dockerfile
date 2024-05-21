FROM node:16-buster

RUN apt-get update && apt-get install -y libreoffice

WORKDIR /app

COPY package*.json ./

RUN npm install

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Copy the application source code
COPY . .

# Ensure all necessary scripts are executable
RUN chmod +x ./node_modules/.bin/tsc

# Run build with direct tsc call
RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/app.js"]
