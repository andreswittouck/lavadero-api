import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiCommonResponses(
  status: HttpStatus,
  message: string,
  type?: any,
) {
  return applyDecorators(
    ApiResponse({ status, description: message, type }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' }),
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
    }),
  );
}
