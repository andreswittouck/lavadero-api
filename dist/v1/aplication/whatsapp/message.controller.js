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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("../../domain/service/whatsapp/whatsapp.service");
const send_message_dto_1 = require("../dtos/send-message.dto");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../utils/decorators/api-responses.decorator");
let MessageController = class MessageController {
    constructor(whatsappService) {
        this.whatsappService = whatsappService;
    }
    async enqueueMessage(data) {
        await this.whatsappService.enqueueMessage(data.phoneNumber, data.message);
        return { status: 'Mensaje encolado' };
    }
    async sendMessage(data) {
        return this.whatsappService.sendMessage(data.phoneNumber, data.message);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Queue a WhatsApp message' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.ACCEPTED, 'Message queued successfully'),
    (0, common_1.Post)('queue'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "enqueueMessage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send a WhatsApp message' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.OK, 'Message sent successfully'),
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "sendMessage", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('Messages'),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService])
], MessageController);
//# sourceMappingURL=message.controller.js.map