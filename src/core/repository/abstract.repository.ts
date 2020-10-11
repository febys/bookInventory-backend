import {Repository} from "typeorm";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";
import {FindConditions} from "typeorm/find-options/FindConditions";
import {NotFoundException} from "@nestjs/common";

export class AbstractRepository<E> extends Repository<E> {
    async findOneOrNotFound(conditions?: FindConditions<E>, options?: FindOneOptions<E>): Promise<E> {
        const result = await this.findOne(conditions, options);

        if (!result) {
            throw new NotFoundException(conditions);
        }

        return result;
    }
}