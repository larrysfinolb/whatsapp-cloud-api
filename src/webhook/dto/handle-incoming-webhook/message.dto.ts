import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TextDto } from './text.dto';
import { MESSAGE_TYPE } from 'src/common/enums/whatsapp.enum';

export class MessageDto {
  @IsString()
  from: string;

  @IsString()
  id: string;

  @IsString()
  timestamp: string;

  @IsEnum(MESSAGE_TYPE)
  type: MESSAGE_TYPE;

  @IsOptional()
  @ValidateNested()
  @Type(() => TextDto)
  text?: TextDto;
}
