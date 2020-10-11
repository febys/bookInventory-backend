import {BadRequestException, Body, Controller, Delete, HttpCode, Post} from '@nestjs/common';
import {UserEntity} from "./user.entity";
import {UserService} from "./user.service";
import {TwoStepAuthDto} from "./dto/two-step-auth.dto";
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UserController {
    constructor(private _userService: UserService) {}

    @Post('gaLogin')
    @HttpCode(200)
    async gaLogin(@Body('idToken') idToken: string): Promise<UserEntity> {
        if (!idToken || idToken === '') {
            throw new BadRequestException('You have not provided the idToken. Please provide it as {"idToken": "*****.****.***-***-***"}');
        }

        return await this._userService.gaLogin(idToken);
    }

    @Post('uuid')
    @HttpCode(200)
    async uuid(@Body('username') username: string): Promise<UserEntity> {
        return await this._userService.uuid(username);
    }

    @Post('password')
    @HttpCode(200)
    async password(@Body() twoStepAuthDto: TwoStepAuthDto): Promise<UserEntity> {
        return await this._userService.password(twoStepAuthDto);
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return await this._userService.register(createUser);
    }

    // @Delete('logout')
    // logout() {}
}
