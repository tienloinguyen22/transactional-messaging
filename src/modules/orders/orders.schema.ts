import { ObjectId } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatuses } from './orders.interface';

@Schema()
export class Order {
  readonly _id: ObjectId;

  @Prop({ type: [String], default: [] })
  readonly items: string;

  @Prop({ type: Number, required: true })
  readonly total: number;

  @Prop({ type: Number, required: true })
  readonly discount: number;

  @Prop({ type: Number, required: true })
  readonly totalAfterDiscount: number;

  @Prop({
    type: String,
    default: OrderStatuses.PENDING,
    enum: [
      OrderStatuses.PENDING,
      OrderStatuses.CONFIRMED,
      OrderStatuses.PREPARING,
      OrderStatuses.DELIVERING,
      OrderStatuses.DELIVERED,
    ],
  })
  readonly status: string;

  @Prop({ type: Date })
  readonly created: Date;

  @Prop({ type: Date })
  readonly updated: Date;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);

export const OrderModel: ModelDefinition = {
  schema: OrderSchema,
  name: Order.name,
};
