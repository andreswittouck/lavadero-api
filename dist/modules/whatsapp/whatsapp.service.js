"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const redis_service_1 = require("../redis/redis.service");
const file_utils_1 = require("../../utils/file-utils");
const qr_image_1 = __importDefault(require("qr-image"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
let WhatsappService = class WhatsappService {
    constructor(redisService) {
        this.redisService = redisService;
        this.queueName = 'whatsapp_messages';
    }
    async onModuleInit() {
        try {
            console.log('Inicializando WhatsApp Web...');
            await (0, file_utils_1.ensureDirectoryExists)('static');
            this.client = new whatsapp_web_js_1.Client({
                puppeteer: {
                    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                },
                authStrategy: new whatsapp_web_js_1.LocalAuth(),
            });
            this.client.on('qr', async (qr) => {
                console.log('QR recibido:', qr);
                await this.saveQrCode(qr, 'static', 'step-2-qr-detected.png');
                console.log('QR guardado en static/step-2-qr-detected.png');
            });
            this.client.on('ready', () => {
                console.log('Cliente de WhatsApp Web listo.');
                this.processMessageQueue();
            });
            await this.client.initialize();
        }
        catch (error) {
            console.error('Error inicializando WhatsApp Web:', error);
        }
    }
    async onModuleDestroy() {
        console.log('Cerrando cliente de WhatsApp...');
        await this.client.destroy();
    }
    async sendMessage(phoneNumber, message) {
        try {
            console.log(`Enviando mensaje a ${phoneNumber}: ${message}`);
            const numberId = await this.client.getNumberId(phoneNumber);
            if (!numberId) {
                throw new Error(`El número ${phoneNumber} no está registrado en WhatsApp.`);
            }
            await this.client.sendMessage(numberId._serialized, message);
            return `Mensaje enviado a ${phoneNumber}`;
        }
        catch (error) {
            console.error('Error al enviar el mensaje:', error);
            if (error instanceof Error) {
                throw new Error(`Error enviando mensaje: ${error.message}`);
            }
            else {
                throw new Error('Error enviando mensaje: Error desconocido');
            }
        }
    }
    async enqueueMessage(phoneNumber, message) {
        const payload = JSON.stringify({ phoneNumber, message });
        await this.redisService.pushToQueue(this.queueName, payload);
        console.log(`Mensaje encolado: ${payload}`);
    }
    async processMessageQueue() {
        while (true) {
            const message = await this.redisService.popFromQueue(this.queueName);
            if (!message) {
                console.log('Cola vacía, esperando mensajes...');
                await new Promise((resolve) => setTimeout(resolve, 5000));
                continue;
            }
            const { phoneNumber, message: text } = JSON.parse(message);
            console.log(`Procesando mensaje: Teléfono=${phoneNumber}, Texto=${text}`);
            await this.sendMessage(phoneNumber, text);
        }
    }
    async saveQrCode(qrData, directory, fileName) {
        const dirPath = path_1.default.resolve(directory);
        try {
            await (0, promises_1.mkdir)(dirPath, { recursive: true });
            console.log(`✅ Directorio creado: ${dirPath}`);
        }
        catch (err) {
            console.error(`⚠️ Error creando directorio ${dirPath}:`, err);
        }
        const qr = qr_image_1.default.image(qrData, { type: 'png' });
        const filePath = path_1.default.join(dirPath, fileName);
        await new Promise((resolve, reject) => {
            const writeStream = fs_1.default.createWriteStream(filePath);
            qr.pipe(writeStream);
            writeStream.on('finish', () => {
                console.log(`✅ QR guardado en: ${filePath}`);
                resolve();
            });
            writeStream.on('error', reject);
        });
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map