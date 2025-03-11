"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCommonResponses = ApiCommonResponses;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiCommonResponses(status, message, type) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({ status, description: message, type }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Bad request' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error',
    }));
}
//# sourceMappingURL=api-responses.decorator.js.map