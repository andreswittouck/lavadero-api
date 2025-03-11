import { HttpStatus } from '@nestjs/common';
export declare function ApiCommonResponses(status: HttpStatus, message: string, type?: any): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
