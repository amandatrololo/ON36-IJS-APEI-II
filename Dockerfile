# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo package.json e o package-lock.json
COPY package*.json ./

# Instalar dependências do projeto
RUN npm install --production

# Copiar todo o restante do projeto para o diretório de trabalho no container
COPY . .

# Definir a variável de ambiente NODE_ENV para produção
ENV NODE_ENV=production

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
