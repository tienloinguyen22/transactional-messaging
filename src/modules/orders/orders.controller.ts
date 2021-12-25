import { Controller, Get } from '@nestjs/common';
import { OutboxService } from '../outbox/outbox.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly outboxService: OutboxService) {}

  @Get()
  public async reindex(): Promise<{ success: boolean; message: string }> {
    console.log('Outbox service: ', this.outboxService);

    return {
      success: true,
      message: 'Order created',
    };
  }
}
