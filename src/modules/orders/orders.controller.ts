import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderPayload } from './orders.interface';
import { Order } from './orders.schema';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async createOrder(
    @Body() payload: CreateOrderPayload,
  ): Promise<Order> {
    return this.orderService.createOrder(payload);
  }
}
