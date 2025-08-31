FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @nestjs/cli && npm install

COPY . .

# Para desarrollo - no compilar, ejecutar directamente
CMD ["npm", "run", "start:dev"]
