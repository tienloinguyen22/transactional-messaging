import { ObjectId } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Outbox {
  readonly _id: ObjectId;

  @Prop({ type: String, required: true })
  readonly domain: string;

  @Prop({ type: String, required: true })
  readonly domainId: string;

  @Prop({ type: String, required: true })
  readonly event: string;

  @Prop({ type: String, required: true })
  readonly payload: string;

  @Prop({ type: Date })
  readonly publishedAt: Date;

  @Prop({ type: Date })
  readonly created: Date;

  @Prop({ type: Date })
  readonly updated: Date;
}

export type OutboxDocument = Outbox & Document;

export const OutboxSchema = SchemaFactory.createForClass(Outbox);

export const OutboxModel: ModelDefinition = {
  schema: OutboxSchema,
  name: Outbox.name,
};
