"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_module_1 = require("./v1/aplication/whatsapp/whatsapp.module");
const database_module_1 = require("./v1/infrastructure/database/database.module");
const redis_module_1 = require("./v1/aplication/redis/redis.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./v1/infrastructure/database/entities/user.entity");
const vehicle_entity_1 = require("./v1/infrastructure/database/entities/vehicle.entity");
const vehicle_service_1 = require("./v1/domain/service/vehicle/vehicle.service");
const user_service_1 = require("./v1/domain/service/user/user.service");
const app_controller_1 = require("./v1/aplication/controllers/app.controller");
const user_controller_1 = require("./v1/aplication/user/user.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, vehicle_entity_1.VehicleEntity]),
            whatsapp_module_1.WhatsappModule,
            database_module_1.DatabaseModule,
            redis_module_1.RedisModule,
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController],
        providers: [vehicle_service_1.VehicleService, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map