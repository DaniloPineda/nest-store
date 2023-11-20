import { PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Max } from "class-validator";

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

    @IsPositive()
    @IsNotEmpty()
    readonly brandId: number;

    @IsNotEmpty()
    @IsArray()
    readonly categoryIds: number[]; 
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }