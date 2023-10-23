FROM node

WORKDIR /app/

RUN npm install express

COPY . .

ENTRYPOINT ["node", "server.js"]