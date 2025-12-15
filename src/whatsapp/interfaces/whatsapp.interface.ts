import {
  MESSAGE_TYPE,
  MESSAGING_PRODUCT,
  RECIPIENT_TYPE,
} from '../../common/enums/whatsapp.enum';

export interface WhatsappResponse {
  messaging_product: MESSAGING_PRODUCT;
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

export interface BaseMessagePayload {
  messaging_product: MESSAGING_PRODUCT;
  recipient_type: RECIPIENT_TYPE;
  to: string;
  type?: MESSAGE_TYPE;
}

export interface TextMessagePayload extends BaseMessagePayload {
  type: MESSAGE_TYPE.TEXT;
  text: {
    body: string;
    preview_url?: boolean;
  };
}
