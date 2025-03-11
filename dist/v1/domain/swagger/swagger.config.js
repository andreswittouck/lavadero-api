"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryHeader = void 0;
exports.configSwagger = configSwagger;
const swagger_1 = require("@nestjs/swagger");
exports.countryHeader = {
    'x-country': {
        description: 'Country code for the request',
        schema: {
            type: 'string',
            example: 'ar',
        },
    },
};
async function configSwagger(app, title, description, servers) {
    if (process.env.NODE_ENV !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle(title)
            .setDescription(description)
            .setVersion('1.0')
            .addBearerAuth();
        if (servers) {
            const serverConfig = servers[process.env.NODE_ENV];
            if (serverConfig) {
                config.addServer(serverConfig.url, serverConfig.description);
            }
        }
        const setup = config.build();
        const options = {
            operationIdFactory: (controllerKey, methodKey) => methodKey,
        };
        const document = swagger_1.SwaggerModule.createDocument(app, setup, options);
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
}
//# sourceMappingURL=swagger.config.js.map