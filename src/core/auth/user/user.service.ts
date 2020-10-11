import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";
import { TwoStepAuthDto } from './dto/two-step-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserRepository) private _userRepository: UserRepository) {}

    async gaLogin(idToken: string): Promise<UserEntity> {
        return await this._userRepository.gaLogin(idToken);
    }

    async uuid(username: string): Promise<UserEntity> {
        return await this._userRepository.uuid(username);
    }

    async password(twoStepAuth: TwoStepAuthDto): Promise<UserEntity> {
        return await this._userRepository.password(twoStepAuth);
    }

    async register(newUser: CreateUserDto): Promise<UserEntity> {
        return await this._userRepository.register(newUser);
    }
}
