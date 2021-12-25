import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoConnectorService } from '../mongo-connector/mongo-connector.service';

@Injectable()
export class OrderService {
  // public readonly log: ILogger = logger(module);

  constructor(
    public readonly db: MongoConnectorService,
    public readonly config: ConfigService,
  ) {}
}
