FROM node:16.19
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["node", "src/server.js"]
EXPOSE 5000
