import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisService } from 'v1/aplication/redis/redis.service';
import axios from 'axios';

@Injectable()
export class WhatsappService implements OnModuleInit, OnModuleDestroy {
  private readonly queueName = 'whatsapp_messages';
  private readonly apiUrl =
    process.env.WHATSAPP_API_URL || 'http://localhost:8080';

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    // console.log('📲 Inicializando conexión con go-whatsapp...');
    // this.processMessageQueue();
  }

  async onModuleDestroy() {
    console.log('🛑 Cerrando servicio de WhatsApp...');
  }

  async sendMessage(phoneNumber: string, message: string): Promise<string> {
    try {
      console.log(`📤 Enviando mensaje a ${phoneNumber}: ${message}`);

      const response = await axios.post(`${this.apiUrl}/send`, {
        phone: phoneNumber,
        message,
      });

      if (response.data.success) {
        return `✅ Mensaje enviado a ${phoneNumber}`;
      } else {
        throw new Error(
          `❌ No se pudo enviar el mensaje: ${response.data.error}`,
        );
      }
    } catch (error) {
      console.error('❌ Error al enviar el mensaje:', error);
      throw new Error(`Error enviando mensaje: ${(error as Error).message}`);
    }
  }

  async enqueueMessage(phoneNumber: string, message: string): Promise<void> {
    const payload = JSON.stringify({ phoneNumber, message });
    await this.redisService.pushToQueue(this.queueName, payload);
    console.log(`🕒 Mensaje encolado: ${payload}`);
  }

  async processMessageQueue(): Promise<void> {
    // while (true) {
    //   const message = await this.redisService.popFromQueue(this.queueName);
    //   if (!message) {
    //     console.log('📭 Cola vacía, esperando mensajes...');
    //     await new Promise((resolve) => setTimeout(resolve, 5000)); // Esperar 5 segundos
    //     continue;
    //   }
    //   const { phoneNumber, message: text } = JSON.parse(message);
    //   console.log(
    //     `📩 Procesando mensaje: Teléfono=${phoneNumber}, Texto=${text}`,
    //   );
    //   await this.sendMessage(phoneNumber, text);
    // }
  }
}
