import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { MetadataDto } from './metadata.dto';
import { Type } from 'class-transformer';
import { ContactDto } from './contact.dto';
import { MessageDto } from './message.dto';

export class ValueDto {
  @IsString()
  messaging_product: string;

  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContactDto)
  contacts?: ContactDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages?: MessageDto[];
}
