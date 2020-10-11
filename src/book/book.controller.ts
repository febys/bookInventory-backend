import {
    Body,
    Controller,
    Delete,
    Get, InternalServerErrorException, NotImplementedException,
    Options,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import {BookEntity} from "./book.entity";
import {BookService} from "./book.service";
import {WrapOptionsResponseInterceptor} from "../core/interceptors/wrap-options-response.interceptor";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {FilterBookDto} from "./dto/filter-book.dto";
import {AbstractParamBeanModel} from "../core/models/abstract-param-bean.model";
import {FilterValidationPipe} from "../core/pipes/filter-validation.pipe";
import {ListModel} from "../core/models/list.model";

@Controller('book')
@UseInterceptors(WrapOptionsResponseInterceptor)
export class BookController {
    constructor(private _bookService: BookService) {}

    @Options()
    getMetadata(): BookEntity {
        return Reflect
            .getMetadata('fieldMetadata', this._bookService.getMetadata());
    }

    @Get()
    @UsePipes(ValidationPipe)
    getDataList(@Query('paramBean', new FilterValidationPipe) paramBean?: FilterBookDto): Promise<ListModel<BookEntity>> {
        return this._bookService.getDataList(paramBean);
    }

    @Get(':bookId')
    getData(@Param('bookId', ParseIntPipe) id: number, @Query('paramBean', new FilterValidationPipe) paramBean?: AbstractParamBeanModel): Promise<BookEntity> {
        return this._bookService.getData(id, paramBean);
    }

    @Post('new')
    @UsePipes(ValidationPipe)
    async createData(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
        const book = this._bookService.createNewData(createBookDto);

        await book.save();

        return book;
    }

    @Put(':bookId')
    updateDate(@Param('bookId', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
        throw new NotImplementedException('The method for update book is not implemented yet!');
    }

    @Delete(':bookId')
    async deleteData(@Param('bookId', ParseIntPipe) id: number): Promise<BookEntity> {
        const {bookEntity, repository} = await this._bookService.deleteData(id);

        const deleteEntity = await repository.remove(bookEntity);

        if (!deleteEntity) {
            throw new InternalServerErrorException();
        }

        return bookEntity;
    }
}
