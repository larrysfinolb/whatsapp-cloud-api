import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { VerifyWebhookDto } from './dto/verify-webhook.dto';
import { HandleIncomingWebhookDto } from './dto/handle-incoming-webhook';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Get()
  verifyWebhook(@Query() verifyWebhookDto: VerifyWebhookDto) {
    return this.webhookService.verifyWebhook(verifyWebhookDto);
  }

  @Post()
  async handleIncomingWebhook(
    @Body() handleIncomingWebhookDto: HandleIncomingWebhookDto,
  ) {
    return await this.webhookService.handleIncomingWebhook(
      handleIncomingWebhookDto,
    );
  }
}
