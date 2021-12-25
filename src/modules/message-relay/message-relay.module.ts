import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConnectorModule } from '../mongo-connector/mongo-connector.module';
import { MessageRelayService } from './message-relay.service';

@Module({
  imports: [ConfigModule, MongoConnectorModule],
  controllers: [],
  providers: [MessageRelayService],
  exports: [],
})
export class MessageRelayModule {}
