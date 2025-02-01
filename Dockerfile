# Etapa 1: Construcción
FROM node:20-bullseye AS builder

WORKDIR /app

# Configurar Puppeteer para evitar la descarga de Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instalar dependencias y Google Chrome Stable
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
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
    wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-chrome-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Verificar instalación de Google Chrome
RUN which google-chrome-stable && google-chrome-stable --version

# Copiar archivos necesarios
COPY package*.json tsconfig.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Crear el directorio `static` para almacenar los QR
RUN mkdir -p /app/static

# Compilar el proyecto
RUN npm run build && ls dist

# Etapa 2: Producción
FROM node:20-bullseye

WORKDIR /app

# Configurar Puppeteer para evitar la descarga de Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instalar dependencias y Google Chrome Stable
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
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
    wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-chrome-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" | tee /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && apt-get install -y google-chrome-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Verificar instalación de Google Chrome
RUN which google-chrome-stable && google-chrome-stable --version

# Copiar los archivos compilados y dependencias
COPY --from=builder /app/dist ./dist
COPY package*.json ./package.json

# Copiar la carpeta `static`
COPY --from=builder /app/static ./static

# Asegurar que `static/` exista en caso de que no se haya copiado
RUN mkdir -p /app/static

# Configurar permisos
RUN chmod -R 755 /app/static

# Instalar dependencias de producción
RUN npm install --omit=dev

# Configurar Puppeteer para usar Google Chrome en Render
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Exponer el puerto correcto según Render
EXPOSE 10000

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]
