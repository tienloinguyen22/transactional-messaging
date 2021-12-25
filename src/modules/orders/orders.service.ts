import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoConnectorService } from '../mongo-connector/mongo-connector.service';
import { CreateOrderPayload } from './orders.interface';
import { Order } from './orders.schema';

@Injectable()
export class OrderService {
  constructor(
    public readonly db: MongoConnectorService,
    public readonly config: ConfigService,
  ) {}

  public async createOrder(payload: CreateOrderPayload): Promise<Order> {
    let order: Order;
    const session = await this.db.orders.startSession();
    await session.withTransaction(async () => {
      const [newOrder] = await this.db.orders.create(
        [
          {
            ...payload,
            totalAfterDiscount: payload.total - payload.discount,
          },
        ],
        { session },
      );
      order = newOrder.toObject();

      await this.db.outboxes.create(
        [
          {
            domain: 'orders',
            domainId: String(order._id),
            event: 'orders.created',
            payload: JSON.stringify(order),
          },
        ],
        { session },
      );
    });
    await session.endSession();

    return order;
  }
}
