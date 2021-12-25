import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventBusService } from './event-bus.service';

@Injectable()
@Module({
  imports: [ConfigModule],
  providers: [EventBusService.getProvider()],
  exports: [EventBusService.getProvider()],
})
export class EventBusModule {}
