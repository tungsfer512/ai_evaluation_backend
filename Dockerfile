FROM node:18.12
WORKDIR /app
COPY . .
RUN npm install --production
RUN npm run setupdb
CMD ["node", "src/server.js"]
EXPOSE 5000
