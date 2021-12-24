import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
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
    MongooseModule.forFeature([]),
  ],
  providers: [MongoConnectorService],
  exports: [MongoConnectorService],
})
export class MongoConnectorModule {}
