import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import {FieldAccess} from "../../decorators/field-access.decorator";
import {BookEntity} from "../../../book/book.entity";
import { Exclude } from 'class-transformer';

@Entity('user')
@Unique(['username'])
export class UserEntity extends BaseEntity {
    @FieldAccess({
        canPost: 9,
        canPut: 9
    })
    @PrimaryGeneratedColumn()
    id: number;

    @FieldAccess()
    @Column()
    firstName: string;

    @FieldAccess()
    @Column()
    lastName: string;

    @FieldAccess({
        canPost: 5,
        canPut: 7
    })
    @Column()
    username: string;

    @FieldAccess({
        canPut: 9
    })
    @Column()
    uuid: string;

    @FieldAccess({
        canGet: 9,
        canPost: 9,
        canPut: 9
    })
    @Exclude()
    @Column()
    passwordSalt: string;

    @FieldAccess({
        canGet: 5,
        canPost: 5,
        canPut: 5
    })
    @Exclude()
    @Column()
    password: string;

    @FieldAccess({
        canPost: 9,
        canPut: 9
    })
    @Column()
    userAccess: number;

    authToken: string;
    expireIn: Date;
    pictureSrc: string;

    @OneToMany(type => BookEntity, book => book.user, {eager: true})
    books: Array<BookEntity>;
}
