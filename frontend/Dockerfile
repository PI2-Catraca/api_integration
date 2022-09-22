FROM node:16

WORKDIR /app/frontend

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]