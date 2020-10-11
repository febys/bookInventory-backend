import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BookCurrency} from "./book-currency.enum";
import {FieldAccess} from "../core/decorators/field-access.decorator";
import {BookCategory} from "./book-category.enum";
import {FieldOptions} from "../core/decorators/field-options.decorator";
import {UserEntity} from "../core/auth/user/user.entity";

@Entity('book')
export class BookEntity extends BaseEntity {
    @FieldAccess({
        canPost: 9,
        canPut: 9
    })
    @PrimaryGeneratedColumn()
    id: number;

    @FieldAccess({
        canPut: 7
    })
    @Column('character varying', {
        length: 75,
        nullable: false
    })
    title: string;

    @FieldAccess({
        canPut: 5
    })
    @Column()
    description: string;

    @FieldAccess({
        canPut: 5
    })
    @FieldOptions({
        fieldDataPool: BookCategory
    })
    @Column()
    category: BookCategory;

    @FieldAccess({
        canPost: 9,
        canPut: 9
    })
    @Column('timestamp')
    publishedDate: string;

    @FieldAccess({
        canPut: 7
    })
    @Column()
    author: string;

    @FieldAccess({
        canPut: 5
    })
    @Column()
    image: string;

    @FieldAccess({
        canPut: 5
    })
    @Column()
    price: number;

    // @FieldAccess()
    // @FieldOptions({
    //     fieldDataPool: BookCurrency
    // })
    // @Column()
    // currency: BookCurrency;

    labelMap: any;

    @ManyToOne(type => UserEntity, user => user.books, {eager: false})
    user: UserEntity;
}
