import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SendTextMessageDto } from './dto/send-text-message.dto';
import { MESSAGE_TYPE, MESSAGING_PRODUCT } from '../common/enums/whatsapp.enum';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Send a text message via WhatsApp API
   * @param sendTextMessageDto
   * @returns Response from Meta API
   */
  async sendTextMessage(sendTextMessageDto: SendTextMessageDto) {
    const payload = {
      messaging_product: MESSAGING_PRODUCT.WHATSAPP,
      to: sendTextMessageDto.to,
      type: MESSAGE_TYPE.TEXT,
      text: {
        body: sendTextMessageDto.body,
        preview_url: sendTextMessageDto?.previewUrl,
      },
    };

    return this.sendToMeta(payload);
  }

  // TODO: Send media message
  async sendMediaMessage() {}

  // TODO: Send location message
  async sendLocationMessage() {}

  // TODO: Send interactive buttons
  async sendInteractiveButtons() {}

  // TODO: Mark message as read
  async markMessageAsRead() {}

  /**
   * Common method to send requests to Meta WhatsApp API
   * @param payload
   * @returns Response from Meta API
   */
  private async sendToMeta(payload: any) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.post('messages', payload),
      );
      return data;
    } catch (error) {
      const metaError = error.response?.data?.error;
      const message = metaError
        ? `Meta Error (${metaError.code}): ${metaError.message} - ${metaError.error_user_msg || ''}`
        : error.message;

      // TODO: Cambiar este log por un logger adecuado
      console.error('Error sending request to Meta:', message);

      throw new InternalServerErrorException(message);
    }
  }
}
