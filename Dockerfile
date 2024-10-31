# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo package.json e o package-lock.json (se existir) antes de copiar o restante dos arquivos
COPY package*.json ./

# Definir argumento para NODE_ENV (padrão: production)
ARG NODE_ENV=production

# Instalar dependências
RUN npm install --only=production

# Copiar o restante do código para o diretório de trabalho
COPY . .

# Definir a variável de ambiente NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar as migrações e iniciar a aplicação
CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]
