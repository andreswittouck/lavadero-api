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
const general_module_1 = require("./modules/general/general.module");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
const database_module_1 = require("./modules/database/database.module");
const redis_module_1 = require("./modules/redis/redis.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            general_module_1.GeneralModule,
            whatsapp_module_1.WhatsappModule,
            database_module_1.DatabaseModule,
            redis_module_1.RedisModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map