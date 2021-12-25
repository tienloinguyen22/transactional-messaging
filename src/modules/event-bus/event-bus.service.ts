import { Injectable, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Publish, Subscribe } from './event-bus.interface';
import { assertPublish } from './event-bus.publish';
import { assertSubscribe } from './event-bus.subscribe';

@Injectable()
export class EventBusService {
  constructor(
    private readonly config: ConfigService,
    public readonly publish: Publish,
    public readonly subscribe: Subscribe,
  ) {}

  public static getProvider(): Provider {
    return {
      provide: EventBusService,
      useFactory: EventBusService.useFactory,
      inject: [ConfigService],
    };
  }

  public static async useFactory(
    config: ConfigService,
  ): Promise<EventBusService> {
    const [publish, subscribe] = await Promise.all([
      assertPublish({
        rabbitUrl: config.get<string>('RABBITMQ_URL'),
        exchangeName: config.get<string>('RABBITMQ_EXCHANGE_NAME'),
      }),
      assertSubscribe({
        rabbitUrl: config.get<string>('RABBITMQ_URL'),
        exchangeName: config.get<string>('RABBITMQ_EXCHANGE_NAME'),
        serviceName: config.get<string>('SERVICE_NAME'),
      }),
    ]);

    return new EventBusService(config, publish, subscribe);
  }
}
