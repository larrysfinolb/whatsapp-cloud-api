import { IsArray, IsString, ValidateNested } from 'class-validator';
import { EntryDto } from './entry.dto';
import { Type } from 'class-transformer';

export class HandleIncomingWebhookDto {
  @IsString()
  object: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntryDto)
  entry: EntryDto[];
}
