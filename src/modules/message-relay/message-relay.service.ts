import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoConnectorService } from '../mongo-connector/mongo-connector.service';
import { Outbox } from '../outbox/outbox.schema';

@Injectable()
export class MessageRelayService implements OnApplicationBootstrap {
  constructor(
    public readonly db: MongoConnectorService,
    public readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.consumeOutboxChangeStream();
  }

  private async consumeOutboxChangeStream(): Promise<void> {
    const changeStream = this.db.outboxes.watch<Outbox>(
      [
        {
          $match: { operationType: 'insert' },
        },
      ],
      {
        fullDocument: 'updateLookup',
      },
    );
    changeStream.on('change', async (change) => {
      const fullDocument = change.fullDocument;
      console.log('🚀 Outbox: ', fullDocument);
    });
  }
}
