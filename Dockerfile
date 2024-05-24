FROM node:18-alpine
WORKDIR /app 
COPY . .
CMD ["node", "src/app.js"]
EXPOSE 3000
