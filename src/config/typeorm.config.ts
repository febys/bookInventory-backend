import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {BookEntity} from "../book/book.entity";
import {UserEntity} from "../core/auth/user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ermena123',
    database: 'postgres',
    entities: [BookEntity, UserEntity],
    synchronize: true
};
