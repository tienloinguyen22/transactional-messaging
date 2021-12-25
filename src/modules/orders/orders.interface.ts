import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export enum OrderStatuses {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
}

export class CreateOrderPayload {
  @IsArray()
  @ArrayNotEmpty()
  items: string[];

  @IsNumber()
  total: number;

  @IsNumber()
  discount: number;
}
