FROM --platform=linux/amd64 node:22

#diretorio
WORKDIR /app

COPY package*.json ./

RUN yarn install
COPY . .

RUN yarn prisma generate

EXPOSE 3000

CMD ["yarn", "dev"]
