FROM node

WORKDIR /app/

RUN npm install express
RUN npm install cors 


COPY . .

ENTRYPOINT ["node", "server.js"]