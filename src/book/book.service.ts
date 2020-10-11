import {Injectable, NotFoundException} from '@nestjs/common';
import {BookEntity} from "./book.entity";
import {FilterBookDto} from "./dto/filter-book.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {BookRepository} from "./book.repository";
import {CreateBookDto} from "./dto/create-book.dto";
import {BookCurrency} from "./book-currency.enum";
import {BookCategory} from "./book-category.enum";
import {AbstractParamBeanModel} from "../core/models/abstract-param-bean.model";
import {ListModel} from "../core/models/list.model";

@Injectable()
export class BookService {
    constructor(@InjectRepository(BookRepository) private _bookRepository: BookRepository) {}

    // noinspection JSMethodCanBeStatic
    getMetadata(): BookEntity {
        return new BookEntity();
    }

    async getDataList(paramBean: FilterBookDto): Promise<ListModel<BookEntity>> {

        let {fillFieldLabels, pageNo, pageSize} = paramBean;

        pageNo = pageNo || 1;
        pageSize = pageSize || 25;

        const {entities, totalRecords} = await this._bookRepository.findAndCountBooks({
            skip: ((pageNo - 1) * pageSize),
            take: pageSize
        });


        if (fillFieldLabels) {
            entities.map(book => {
                book.labelMap = {
                    category: Object
                        .keys(BookCategory)
                        .filter(key => (BookCategory[key] === book.category))[0]
                    // currency: Object
                    //     .keys(BookCurrency)
                    //     .filter(key => (BookCurrency[key] === book.currency))[0]
                };

                return book;
            });
        }

        return new ListModel<BookEntity>(entities, {
            pageNo,
            pageSize,
            totalRecords
        });
    }

    async getData(id: number, paramBean?: AbstractParamBeanModel): Promise<BookEntity> {
        const book: BookEntity = await this._bookRepository.findOne({id});

        if (!book) {
            throw new NotFoundException(`The book with the id: ${id} does not exist !`);
        }

        if(paramBean) {
            const {fillFieldLabels} = paramBean;

            if (fillFieldLabels) {
                book.labelMap = {
                    category: Object
                        .keys(BookCategory)
                        .filter(key => (BookCategory[key] === book.category))[0]
                    // currency: Object
                    //     .keys(BookCurrency)
                    //     .filter(key => (BookCurrency[key] === book.currency))[0],
                };
            }
        }

        return book;
    }

    createNewData(data: CreateBookDto): BookEntity {

        const {title, description, category, author, image, price} = data;

        const book = new BookEntity();
        book.title = title;
        book.description = description;
        book.category = category;
        book.publishedDate = new Date().toISOString();
        book.author = author;
        book.image = image;
        book.price = price;
        // book.currency = currency;

        return book;
    }

    updateData(id: number, data: any) {}

    async deleteData(id: number): Promise<{bookEntity: BookEntity, repository: BookRepository}> {
        const book: BookEntity = await this.getData(id);

        return {
            bookEntity: book,
            repository: this._bookRepository
        }
    }
}
