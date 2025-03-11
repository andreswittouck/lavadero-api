# Desarrollo
FROM node:20-bullseye

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Instalamos NestJS CLI global
RUN npm install -g @nestjs/cli

COPY . .

# Eliminar archivos de compilación anteriores antes de construir
RUN rm -rf dist tsconfig.build.tsbuildinfo
RUN find /app/dist -mindepth 1 -delete || true


# Compilar TypeScript antes de ejecutar
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para desarrollo
CMD ["sh", "-c", "npm run build && npm run start:dev"]
