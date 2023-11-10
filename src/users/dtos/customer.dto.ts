import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';

export class CreateFavoriteDto {

  @IsNotEmpty()
  @IsString() 
  readonly name: string;
  
  @IsNotEmpty()
  @IsString()
  @IsIn(['small', 'medium', 'large'])
  readonly size: string;
 }

 export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}

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

  @IsNotEmpty()
  @ValidateNested()
  readonly favorite: CreateFavoriteDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFavoriteDto)
  readonly favorites: CreateFavoriteDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

