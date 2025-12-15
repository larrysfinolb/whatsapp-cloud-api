import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
