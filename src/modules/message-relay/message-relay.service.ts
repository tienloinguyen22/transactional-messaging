import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBusService } from '../event-bus/event-bus.service';
import { MongoConnectorService } from '../mongo-connector/mongo-connector.service';
import { Outbox } from '../outbox/outbox.schema';

@Injectable()
export class MessageRelayService implements OnApplicationBootstrap {
  constructor(
    public readonly db: MongoConnectorService,
    public readonly config: ConfigService,
    @Inject(EventBusService) public readonly eventBusService: EventBusService,
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
      console.log('Eventbus service: ', this.eventBusService);
      console.log('Outbox: ', fullDocument);
    });
  }
}
