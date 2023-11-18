import { PartialType } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsDate()
    @IsNotEmpty()
    readonly date: string;

    @IsNotEmpty()
    @IsNumber()
    readonly customerId: number;

    // @IsNotEmpty()
    // @IsArray()
    // readonly productIds: number[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}