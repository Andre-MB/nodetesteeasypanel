# Imagem base
FROM node:20-alpine

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install --production

# Copiar o restante da aplicação
COPY . .

# Expor a porta (se for usar API com express, ajuste para 3000)
EXPOSE 80

# Comando de inicialização
CMD ["node", "admin.js"]
