import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { RedisService } from '../redis/redis.service';
import { ensureDirectoryExists } from '../../utils/file-utils';
import qrImage from 'qr-image';
import fs from 'fs';
import { mkdir } from 'fs/promises';

@Injectable()
export class WhatsappService implements OnModuleInit, OnModuleDestroy {
  private client: Client;
  private readonly queueName = 'whatsapp_messages';

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    try {
      console.log('Inicializando WhatsApp Web...');
      await ensureDirectoryExists('static');

      this.client = new Client({
        puppeteer: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        authStrategy: new LocalAuth(),
      });

      this.client.on('qr', async (qr) => {
        console.log('QR recibido:', qr);
        await this.saveQrCode(qr, 'static', 'step-2-qr-detected.png');
        console.log('QR guardado en static/step-2-qr-detected.png');
      });

      this.client.on('ready', () => {
        console.log('Cliente de WhatsApp Web listo.');
        this.processMessageQueue(); // Procesar mensajes en cola al iniciar
      });

      await this.client.initialize();
    } catch (error) {
      console.error('Error inicializando WhatsApp Web:', error);
    }
  }

  async onModuleDestroy() {
    console.log('Cerrando cliente de WhatsApp...');
    await this.client.destroy();
  }

  async sendMessage(phoneNumber: string, message: string): Promise<string> {
    try {
      console.log(`Enviando mensaje a ${phoneNumber}: ${message}`);
      const numberId = await this.client.getNumberId(phoneNumber);
      if (!numberId) {
        throw new Error(
          `El número ${phoneNumber} no está registrado en WhatsApp.`,
        );
      }
      await this.client.sendMessage(numberId._serialized, message);
      return `Mensaje enviado a ${phoneNumber}`;
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      if (error instanceof Error) {
        throw new Error(`Error enviando mensaje: ${error.message}`);
      } else {
        throw new Error('Error enviando mensaje: Error desconocido');
      }
    }
  }

  async enqueueMessage(phoneNumber: string, message: string): Promise<void> {
    const payload = JSON.stringify({ phoneNumber, message });
    await this.redisService.pushToQueue(this.queueName, payload);
    console.log(`Mensaje encolado: ${payload}`);
  }

  async processMessageQueue(): Promise<void> {
    while (true) {
      const message = await this.redisService.popFromQueue(this.queueName);
      if (!message) {
        console.log('Cola vacía, esperando mensajes...');
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Esperar 5 segundos
        continue;
      }

      const { phoneNumber, message: text } = JSON.parse(message);
      console.log(`Procesando mensaje: Teléfono=${phoneNumber}, Texto=${text}`);
      await this.sendMessage(phoneNumber, text);
    }
  }

  private async saveQrCode(
    qrData: string,
    directory: string,
    fileName: string,
  ) {
    await mkdir(directory, { recursive: true });
    const qr = qrImage.image(qrData, { type: 'png' });
    const filePath = `${directory}/${fileName}`;

    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      qr.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }
}
