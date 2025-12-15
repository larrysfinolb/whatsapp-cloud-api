import { ForbiddenException, Injectable } from '@nestjs/common';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import { envs } from 'src/config';
import { BotService } from 'src/bot/bot.service';
import { HandleIncomingWebhookDto } from './dto/handle-incoming-webhook';
import { MESSAGE_TYPE } from 'src/common/enums/whatsapp.enum';

@Injectable()
export class WebhookService {
  constructor(private readonly botService: BotService) {}

  verifyWebhook(verifyWebhookDto: VerifyWebhookDto) {
    const mode = verifyWebhookDto.mode;
    const verifyToken = verifyWebhookDto.verifyToken;
    const challenge = verifyWebhookDto.challenge;

    const myVerifyToken = envs.whatsappCloudApi.verifyToken;

    if (!mode || !verifyToken) {
      throw new Error('Missing mode or verifyToken');
    }

    if (mode === 'subscribe' && verifyToken === myVerifyToken) {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Webhook verified successfully');

      return challenge;
    } else {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Webhook verification failed. Token received:', verifyToken);
      throw new ForbiddenException('Token verification failed');
    }
  }

  async handleIncomingWebhook(
    handleIncomingWebhookDto: HandleIncomingWebhookDto,
  ) {
    try {
      const entry = handleIncomingWebhookDto.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (!value?.messages) {
        return;
      }

      const message = value.messages[0];
      const from = message.from;

      if (message.type === MESSAGE_TYPE.TEXT) {
        const body = message.text?.body;

        if (!body) {
          console.log(
            `Received message from ${from} of type TEXT but with no content.`,
          );
          return;
        }

        await this.botService.handleMessage(from, body);
      }
    } catch (error) {
      // TODO: Cambiar este log por un logger adecuado
      console.log('Error processing webhook event:', error.stack);
    }
  }
}
