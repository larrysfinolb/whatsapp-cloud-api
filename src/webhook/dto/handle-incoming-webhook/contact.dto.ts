import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ProfileDto } from './profile.dto';

export class ContactDto {
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @IsString()
  wa_id: string;
}
