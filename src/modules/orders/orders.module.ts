import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConnectorModule } from '../mongo-connector/mongo-connector.module';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [ConfigModule, MongoConnectorModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
