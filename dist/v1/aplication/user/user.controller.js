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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../domain/service/user/user.service");
const create_user_dto_1 = require("../dtos/create-user.dto");
const _update_user_dto_1 = require("../dtos/ update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../utils/decorators/api-responses.decorator");
const user_entity_1 = require("../../infrastructure/database/entities/user.entity");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(userData) {
        return this.userService.create(userData);
    }
    getUsers() {
        return this.userService.findAll();
    }
    editUser(id, userData) {
        return this.userService.editUser(Number(id), userData);
    }
    deleteUser(id) {
        return this.userService.deleteUser(Number(id));
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.CREATED, 'User successfully created', user_entity_1.UserEntity),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.OK, 'List of users', [user_entity_1.UserEntity]),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.OK, 'User updated successfully', user_entity_1.UserEntity),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, _update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user' }),
    (0, api_responses_decorator_1.ApiCommonResponses)(common_1.HttpStatus.NO_CONTENT, 'User deleted successfully'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map