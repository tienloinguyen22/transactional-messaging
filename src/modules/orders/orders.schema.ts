import { ObjectId } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  readonly _id: ObjectId;

  @Prop({ type: [String], default: [] })
  readonly items: string;

  @Prop({ type: Number, required: true })
  readonly total: number;

  @Prop({ type: Number, required: true })
  readonly discount: string;

  @Prop({ type: Number, required: true })
  readonly totalAfterDiscount: number;

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
