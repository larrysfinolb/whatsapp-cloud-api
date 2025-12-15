import { Module } from '@nestjs/common';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WebhookModule } from './webhook/webhook.module';
import { BotModule } from './bot/bot.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [WhatsappModule, WebhookModule, BotModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
