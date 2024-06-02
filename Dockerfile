FROM node:20
WORKDIR /usr/src/app.
COPY . .

RUN cd frontend && npm i
RUN cd frontend && npm run build
RUN cd server && npm i
RUN cd server && npm i bcrypt --build-from-source

EXPOSE 5100

CMD ["node", "server/index.js"]