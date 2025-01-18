import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import fs, { writeFile } from 'fs/promises';

@Injectable()
export class WhatsappService implements OnModuleInit, OnModuleDestroy {
  private browser: Browser;
  private page: Page;
  private isInitialized = false;
  private sessionFilePath = 'session.json';

  async onModuleInit() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    console.log('Iniciando Puppeteer y WhatsApp Web...');

    const sessionData = await this.loadSession();

    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    this.page = await this.browser.newPage();

    if (sessionData) {
      console.log('Cargando sesión guardada...');
      await this.page.setCookie(...sessionData);
    }

    try {
      console.log('Navegando a WhatsApp Web...');
      await this.page.goto('https://web.whatsapp.com', {
        waitUntil: 'domcontentloaded',
      });

      // Capturar el DOM actual
      console.log('Capturando elementos visibles...');
      const domElements = await this.page.evaluate(() => {
        return Array.from(document.querySelectorAll('*')).map(
          (el) => el.outerHTML,
        );
      });
      await writeFile('visible-elements.html', domElements.join('\n'));

      console.log('Archivo generado: visible-elements.html');

      // Capturar pantalla
      await this.page.screenshot({ path: 'step-1-page-loaded.png' });
      console.log('Captura de pantalla guardada: step-1-page-loaded.png');

      if (!sessionData) {
        const qrSelector = 'canvas[aria-label="Scan me!"]';
        const chatSidebarSelector = 'div[aria-label="Chat list"]';

        console.log('Esperando que se muestre el QR...');
        try {
          const qrVisible = await this.page.waitForSelector(qrSelector, {
            timeout: 30000, // Tiempo de espera para detectar el QR
          });

          if (qrVisible) {
            console.log('QR detectado. Escanea el QR.');
            await this.page.screenshot({ path: 'step-2-qr-detected.png' });
            console.log('Captura de pantalla guardada: step-2-qr-detected.png');

            console.log('Presiona Enter una vez que hayas escaneado el QR.');
            await new Promise<void>((resolve) => {
              process.stdin.once('data', () => resolve());
            });

            console.log('Verificando autenticación...');
            await this.page.waitForSelector(chatSidebarSelector, {
              timeout: 60000, // Tiempo para que la barra lateral de chats aparezca
            });

            console.log('Autenticación exitosa. Sesión activa.');
            await this.page.screenshot({ path: 'step-3-authenticated.png' });
            console.log(
              'Captura de pantalla guardada: step-3-authenticated.png',
            );

            await this.saveSession();
            return;
          }
        } catch (qrError) {
          console.error('Error al detectar el QR:', qrError.message);
        }

        console.log('Verificando si ya estás autenticado...');
        const isLoggedIn = await this.page.$(chatSidebarSelector);

        if (isLoggedIn) {
          console.log('Sesión activa detectada.');
          await this.page.screenshot({ path: 'step-4-session-active.png' });
          console.log(
            'Captura de pantalla guardada: step-4-session-active.png',
          );
          await this.saveSession();
          return;
        }

        console.log('No se pudo autenticar en WhatsApp Web.');
        await this.page.screenshot({ path: 'step-5-auth-error.png' });
        console.log('Captura de pantalla guardada: step-5-auth-error.png');

        throw new Error('No se pudo autenticar en WhatsApp Web.');
      }
    } catch (error) {
      console.error('Error al iniciar WhatsApp Web:', error.message);
      await this.page.screenshot({ path: 'final-error-screenshot.png' });
      console.log('Captura de pantalla guardada: final-error-screenshot.png');
      throw error;
    }
  }

  async onModuleDestroy() {
    console.log('Cerrando Puppeteer...');
    await this.browser?.close();
  }

  private async saveSession() {
    const cookies = await this.page.cookies();

    await writeFile(this.sessionFilePath, JSON.stringify(cookies));
    console.log('Sesión guardada correctamente.');
  }

  private async loadSession() {
    try {
      const data = await fs.readFile(this.sessionFilePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      console.log('No se encontró una sesión guardada.');
      return null;
    }
  }

  async sendMessage(phoneNumber: string, message: string): Promise<string> {
    if (!this.page) {
      throw new Error('WhatsApp Web no está inicializado.');
    }

    const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    console.log('Navegando a URL:', url);

    try {
      await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      console.log('Esperando a que se cargue el chat...');
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const sendButtonSelector = 'button[aria-label="Send"]';
      console.log('Intentando localizar el botón de enviar...');
      await this.page.waitForSelector(sendButtonSelector, { timeout: 30000 });
      await this.page.click(sendButtonSelector);

      console.log(`Mensaje enviado a ${phoneNumber}`);
      return `Mensaje enviado a ${phoneNumber}`;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error.message);
      await this.page.screenshot({ path: 'send-error-screenshot.png' });
      return `Error al enviar el mensaje: ${error.message}`;
    }
  }
}
