import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConnectorModule } from '../mongo-connector/mongo-connector.module';
import { OutboxService } from './outbox.service';

@Module({
  imports: [ConfigModule, MongoConnectorModule],
  controllers: [],
  providers: [OutboxService],
  exports: [OutboxService],
})
export class OutboxModule {}
