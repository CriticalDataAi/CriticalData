import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';


export class CreateHistoryDto {
  @IsString()
  @IsNotEmpty()
  questionSource: string;

  @IsString()
  @IsNotEmpty()
  questionUsername: string;

  @IsString()
  @IsNotEmpty()
  questionAsked: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  questionResponse: string;

  @IsNotEmpty()
  createdAt: Date;
}