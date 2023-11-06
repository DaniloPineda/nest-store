import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}