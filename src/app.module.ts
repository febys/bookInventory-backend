import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { UserModule } from './core/auth/user/user.module';
import {LoggedUsers} from "./core/auth/logged-users";
import {AuthTokenGuard} from "./core/auth/guards/auth-token.guard";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        BookModule,
        UserModule
    ]
})
export class AppModule {
    constructor() {
        LoggedUsers.initLoggedUsers();
    }
}
