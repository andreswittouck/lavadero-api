# Etapa 1: Construcción
FROM node:20-bullseye AS builder

WORKDIR /app

# Configurar Puppeteer para evitar la descarga de Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instalar dependencias y Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiar archivos necesarios
COPY package*.json tsconfig.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Crear el directorio `static` para almacenar los QR
RUN mkdir -p static

# Compilar el proyecto
RUN npm run build && ls dist

# Etapa 2: Producción
FROM node:20-bullseye

WORKDIR /app

# Configurar Puppeteer para evitar la descarga de Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instalar dependencias y Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk1.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiar los archivos compilados, dependencias y el directorio `static`
COPY --from=builder /app/dist ./dist
COPY package*.json ./package.json
COPY static ./static
RUN npm install --omit=dev

# Configurar Puppeteer para usar el Chromium instalado
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
