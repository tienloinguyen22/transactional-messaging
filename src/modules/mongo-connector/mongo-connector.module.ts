import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { OrderModel } from '../orders/orders.schema';
import { OutboxModel } from '../outbox/outbox.schema';
import { MongoConnectorService } from './mongo-connector.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        return {
          uri: configService.get<string>('MONGO_URL'),
        };
      },
    }),
    MongooseModule.forFeature([OrderModel, OutboxModel]),
  ],
  providers: [MongoConnectorService],
  exports: [MongoConnectorService],
})
export class MongoConnectorModule {}
