import {AbstractBookDto} from "./abstract-book.dto";
import {IsInt, IsString, Length} from "class-validator";

export class UpdateBookDto extends AbstractBookDto {
    @IsInt()
    id: number;

    @Length(3, 75)
    @IsString()
    title: string;

    @IsString()
    author: Array<string>;
}