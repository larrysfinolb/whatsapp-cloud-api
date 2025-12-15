import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { HttpModule } from '@nestjs/axios';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    HttpModule.register({
      baseURL: `https://graph.facebook.com/${envs.whatsappCloudApi.version}/${envs.whatsappCloudApi.phoneNumberId}/`,
      headers: {
        Authorization: `Bearer ${envs.whatsappCloudApi.accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
