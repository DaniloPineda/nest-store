import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}