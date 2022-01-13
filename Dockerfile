FROM node

WORKDIR /app

COPY package* /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["node", "dist/src/index.js"]
