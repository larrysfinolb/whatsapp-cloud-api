import { Injectable } from '@nestjs/common';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

enum CONVERSATION_STATE {
  INITIAL = 'INITIAL',
  AWAITING_FOR_DNI = 'AWAITING_FOR_DNI',
}

const MOCKUP_APPOINTMENTS = {
  '12345678': {
    name: 'Larry',
    date: '2025-12-26T15:30:00',
  },
  '87654321': {
    name: 'Alejandro',
    date: '2026-01-15T10:00:00',
  },
};

@Injectable()
export class BotService {
  // ! Si reiniciamos el servidor, se pierden los estados de conversación almacenados en memoria.
  // TODO: Implementar un almacenamiento persistente para los estados de conversación.
  private userStates = new Map<string, CONVERSATION_STATE>();

  constructor(private readonly whatsappService: WhatsappService) {}

  async handleMessage(from: string, message: string) {
    const currentState =
      this.userStates.get(from) || CONVERSATION_STATE.INITIAL;

    switch (currentState) {
      case CONVERSATION_STATE.INITIAL:
        await this.handleInitialFlow(from);
        break;
      case CONVERSATION_STATE.AWAITING_FOR_DNI:
        await this.handleDniFlow(from, message);
        break;
      default:
        this.userStates.delete(from);
    }
  }

  private async handleInitialFlow(from: string) {
    const reply =
      '👋 ¡Hola! Bienvenido al sistema de consultas médicas.\n\nPor favor, escribe el número de tu *Documento de Identidad* para verificar si tienes citas agendadas.';

    await this.whatsappService.sendTextMessage({
      to: from,
      body: reply,
    });

    this.userStates.set(from, CONVERSATION_STATE.AWAITING_FOR_DNI);
  }

  private async handleDniFlow(from: string, input: string) {
    const match = input.match(/\b\d{7,8}\b/);

    if (!match) {
      await this.whatsappService.sendTextMessage({
        to: from,
        body: '❌ El formato de tu documento de identidad no es correcto. Por favor, ingresa un número de 7 u 8 dígitos.',
      });
      return;
    }
    let reply = '';
    const dni = match[0];
    const appointment = MOCKUP_APPOINTMENTS[dni];

    if (appointment) {
      const appointmentDate = new Date(appointment.date);
      const formattedDate = appointmentDate.toLocaleString('es-ES', {
        dateStyle: 'full',
        timeStyle: 'short',
      });

      reply = `✅ ¡Saludos, ${appointment.name}! Tu cita médica está agendada para el *${formattedDate}*.`;
    } else {
      reply =
        'ℹ️ No se encontraron citas médicas asociadas a ese Documento de Identidad.';
    }

    await this.whatsappService.sendTextMessage({
      to: from,
      body: reply,
    });

    this.userStates.delete(from);
  }
}
