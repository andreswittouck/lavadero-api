"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralModule = void 0;
const common_1 = require("@nestjs/common");
const general_controller_1 = require("./general.controller");
const whatsapp_module_1 = require("../whatsapp/whatsapp.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../database/entities/user.entity");
const vehicle_entity_1 = require("../database/entities/vehicle.entity");
const user_service_1 = require("../user/user.service");
const vehicle_service_1 = require("../vehicle/vehicle.service");
const user_controller_1 = require("../user/user.controller");
const vehicle_controller_1 = require("../vehicle/vehicle.controller");
let GeneralModule = class GeneralModule {
};
exports.GeneralModule = GeneralModule;
exports.GeneralModule = GeneralModule = __decorate([
    (0, common_1.Module)({
        imports: [
            whatsapp_module_1.WhatsappModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, vehicle_entity_1.VehicleEntity]),
        ],
        controllers: [general_controller_1.GeneralController, user_controller_1.UserController, vehicle_controller_1.VehicleController],
        providers: [vehicle_service_1.VehicleService, user_service_1.UserService],
    })
], GeneralModule);
//# sourceMappingURL=general.module.js.map