import { Controller, Get } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  public async reindex(): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: 'Order created',
    };
  }
}
