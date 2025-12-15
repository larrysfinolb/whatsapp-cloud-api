import { IsString } from 'class-validator';

export class MetadataDto {
  @IsString()
  display_phone_number: string;

  @IsString()
  phone_number_id: string;
}
