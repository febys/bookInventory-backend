import {EntityRepository, Repository} from "typeorm";
import {BookEntity} from "./book.entity";
import {FindManyOptions} from "typeorm/find-options/FindManyOptions";

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {

    async findAndCountBooks(options?: FindManyOptions<BookEntity>): Promise<{entities: Array<BookEntity>, totalRecords: number}> {
        const entitiesAndRecords: [Array<BookEntity>, number] = await super.findAndCount(options);

        return {
            entities: entitiesAndRecords[0],
            totalRecords: entitiesAndRecords[1]
        };
    }
}