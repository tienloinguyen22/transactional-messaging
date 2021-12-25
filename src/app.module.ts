import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MessageRelayModule } from './modules/message-relay/message-relay.module';
import { MongoConnectorModule } from './modules/mongo-connector/mongo-connector.module';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    MongoConnectorModule,
    OrderModule,
    MessageRelayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
