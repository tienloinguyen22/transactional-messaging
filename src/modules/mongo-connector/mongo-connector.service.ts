import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/orders.schema';

@Injectable()
export class MongoConnectorService {
  constructor(@InjectModel(Order.name) public readonly orders: Model<Order>) {}
}
