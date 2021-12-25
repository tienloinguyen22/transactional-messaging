import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventBusModule } from '../event-bus/event-bus.module';
import { MongoConnectorModule } from '../mongo-connector/mongo-connector.module';
import { MessageRelayService } from './message-relay.service';

@Module({
  imports: [ConfigModule, MongoConnectorModule, EventBusModule],
  controllers: [],
  providers: [MessageRelayService],
  exports: [],
})
export class MessageRelayModule {}
