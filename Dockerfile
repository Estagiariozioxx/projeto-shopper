FROM --platform=linux/amd64 node:22

#diretorio
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN yarn install


# Copiar o restante dos arquivos
COPY . .

# Compilar o projeto
RUN yarn prisma generate

##RUN yarn run build

#RUN yarn prisma migrate deploy




# Expor a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["yarn", "dev"]
