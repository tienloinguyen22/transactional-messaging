import { EXCHANGE_TYPE } from './event-bus.constant';
import { AssertPublishConfigs, Publish } from './event-bus.interface';
import { bufferMsg, resolveChannel } from './event-bus.utils';

export const assertPublish = async (
  configs: AssertPublishConfigs,
): Promise<Publish> => {
  const channel = await resolveChannel(configs.rabbitUrl);
  await channel.assertExchange(configs.exchangeName, EXCHANGE_TYPE);

  return <T>(msg: T, routingKey: string) => {
    return channel.publish(configs.exchangeName, routingKey, bufferMsg(msg));
  };
};
