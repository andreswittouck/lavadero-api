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
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("../../domain/service/vehicle/vehicle.service");
const create_vehicle_dto_1 = require("../dtos/create-vehicle.dto");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../utils/decorators/api-responses.decorator");
const vehicle_entity_1 = require("../../infrastructure/database/entities/vehicle.entity");
let VehicleController = class VehicleController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    createVehicle(vehicleData) {
        return this.vehicleService.createVehicle(vehicleData);
    }
    getVehicles() {
        return this.vehicleService.findAll();
    }
    editVehicle(id, vehicleData) {
        return this.vehicleService.updateVehicle(Number(id), vehicleData);
    }
    deleteVehicle(id) {
        return this.vehicleService.deleteVehicle(Number(id));
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vehicle' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.CREATED, 'Vehicle successfully created', vehicle_entity_1.VehicleEntity),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_dto_1.CreateVehicleDto]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "createVehicle", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.OK, 'List of vehicles', [vehicle_entity_1.VehicleEntity]),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "getVehicles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update vehicle' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.OK, 'Vehicle updated successfully', vehicle_entity_1.VehicleEntity),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_vehicle_dto_1.CreateVehicleDto]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "editVehicle", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete vehicle' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.NO_CONTENT, 'Vehicle deleted successfully'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "deleteVehicle", null);
exports.VehicleController = VehicleController = __decorate([
    (0, swagger_1.ApiTags)('Vehicles'),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map