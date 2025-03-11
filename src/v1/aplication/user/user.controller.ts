import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'v1/domain/service/user/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/ update-user.dto';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { ApiCommonResponses } from 'v1/utils/decorators/api-responses.decorator';
import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCommonResponses(
    HttpStatus.CREATED,
    'User successfully created',
    UserEntity,
  )
  @ApiConsumes('application/json')
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiCommonResponses(HttpStatus.OK, 'List of users', [UserEntity])
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiCommonResponses(HttpStatus.OK, 'User updated successfully', UserEntity)
  @Put(':id')
  editUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.userService.editUser(Number(id), userData);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiCommonResponses(HttpStatus.NO_CONTENT, 'User deleted successfully')
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
