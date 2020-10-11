import {IsString} from "class-validator";

export class TwoStepAuthDto {
    @IsString()
    uuid: string;

    @IsString()
    password: string;
}