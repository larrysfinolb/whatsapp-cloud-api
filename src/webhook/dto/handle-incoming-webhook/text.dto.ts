import { IsString } from 'class-validator';

export class TextDto {
  @IsString()
  body: string;
}
