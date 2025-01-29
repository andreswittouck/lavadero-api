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
exports.GeneralController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("../whatsapp/whatsapp.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("../database/entities/vehicle.entity");
let GeneralController = class GeneralController {
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
    async getQrCode(res) {
        const qrPath = 'static/step-2-qr-detected.png';
        try {
            return res.sendFile(qrPath, { root: process.cwd() });
        }
        catch (error) {
            return res.status(404).json({ message: 'QR no encontrado.' });
        }
    }
    async createUser(userData) {
        const user = this.userRepository.create({
            ...userData,
            vehicles: userData.vehicles || [],
        });
        return this.userRepository.save(user);
    }
    async getUsers() {
        return this.userRepository.find({ relations: ['vehicles'] });
    }
    async createVehicle(vehicleData) {
        const vehicle = this.vehicleRepository.create(vehicleData);
        return this.vehicleRepository.save(vehicle);
    }
    async editUser(id, userData) {
        await this.userRepository.update(Number(id), {
            ...userData,
            vehicles: userData.vehicles || [],
        });
        return this.userRepository.findOneOrFail({ where: { id: Number(id) } });
    }
    async deleteUser(id) {
        await this.userRepository.delete(Number(id));
    }
};
exports.GeneralController = GeneralController;
__decorate([
    (0, common_1.Post)('queue-message'),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "enqueueMessage", null);
__decorate([
    (0, common_1.Post)('send-message'),
    __param(0, (0, common_1.Body)('phoneNumber')),
    __param(1, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('qr'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "getQrCode", null);
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)('vehicles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "editUser", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneralController.prototype, "deleteUser", null);
exports.GeneralController = GeneralController = __decorate([
    (0, common_1.Controller)('general'),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(vehicle_entity_1.VehicleEntity)),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GeneralController);
//# sourceMappingURL=general.controller.js.map