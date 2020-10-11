import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookRepository} from "./book.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([BookRepository])
    ],
    providers: [BookService],
    controllers: [BookController]
})
export class BookModule {}
