FROM node

WORKDIR /app

COPY package* /app/

RUN npm install

COPY . /app/

EXPOSE 3000

ENV PORT=3000

RUN npm run build

CMD ["node", "dist/index.js"]
