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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../infrastructure/database/entities/user.entity");
const vehicle_entity_1 = require("../../infrastructure/database/entities/vehicle.entity");
const whatsapp_service_1 = require("../../domain/service/whatsapp/whatsapp.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AppController = class AppController {
    constructor(whatsappService, userRepository, vehicleRepository) {
        this.whatsappService = whatsappService;
        this.userRepository = userRepository;
        this.vehicleRepository = vehicleRepository;
    }
    async enqueueMessage(phoneNumber, message) {
        await this.whatsappService.enqueueMessage(phoneNumber, message);
        return { status: 'Mensaje encolado' };
    }
    async sendMessage(phoneNumber, message) {
        return this.whatsappService.sendMessage(phoneNumber, message);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('queue-message'),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "enqueueMessage", null);
__decorate([
    (0, common_1.Post)('send-message'),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendMessage", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)({ path: '', version: '1' }),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(vehicle_entity_1.VehicleEntity)),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AppController);
//# sourceMappingURL=app.controller.js.map