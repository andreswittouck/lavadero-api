import { INestApplication } from '@nestjs/common';
interface serverConfigValue {
    url: string;
    description: string;
}
interface serverConfig {
    [key: string]: serverConfigValue;
}
export declare const countryHeader: {
    'x-country': {
        description: string;
        schema: {
            type: string;
            example: string;
        };
    };
};
export declare function configSwagger(app: INestApplication, title: string, description: string, servers: serverConfig): Promise<void>;
export {};
