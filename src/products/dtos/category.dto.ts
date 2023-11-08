import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}