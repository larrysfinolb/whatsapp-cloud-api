import { IsString, ValidateNested } from 'class-validator';
import { ValueDto } from './value.dto';
import { Type } from 'class-transformer';

export class ChangeDto {
  @ValidateNested()
  @Type(() => ValueDto)
  value: ValueDto;

  @IsString()
  field: string;
}
