import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBrandDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}