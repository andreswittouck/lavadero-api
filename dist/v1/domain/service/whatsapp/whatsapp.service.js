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
const redis_service_1 = require("../../../aplication/redis/redis.service");
const axios_1 = __importDefault(require("axios"));
let WhatsappService = class WhatsappService {
    constructor(redisService) {
        this.redisService = redisService;
        this.queueName = 'whatsapp_messages';
        this.apiUrl = process.env.WHATSAPP_API_URL || 'http://localhost:8080';
    }
    async onModuleInit() {
    }
    async onModuleDestroy() {
        console.log('🛑 Cerrando servicio de WhatsApp...');
    }
    async sendMessage(phoneNumber, message) {
        try {
            console.log(`📤 Enviando mensaje a ${phoneNumber}: ${message}`);
            const response = await axios_1.default.post(`${this.apiUrl}/send`, {
                phone: phoneNumber,
                message,
            });
            if (response.data.success) {
                return `✅ Mensaje enviado a ${phoneNumber}`;
            }
            else {
                throw new Error(`❌ No se pudo enviar el mensaje: ${response.data.error}`);
            }
        }
        catch (error) {
            console.error('❌ Error al enviar el mensaje:', error);
            throw new Error(`Error enviando mensaje: ${error.message}`);
        }
    }
    async enqueueMessage(phoneNumber, message) {
        const payload = JSON.stringify({ phoneNumber, message });
        await this.redisService.pushToQueue(this.queueName, payload);
        console.log(`🕒 Mensaje encolado: ${payload}`);
    }
    async processMessageQueue() {
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map