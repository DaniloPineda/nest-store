import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Max } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Max(999)
    readonly price: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }