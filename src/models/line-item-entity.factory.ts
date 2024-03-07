import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { LineItemEntity } from './line-item-entity';

export const lineItemEntityFactory = Factory.Sync.makeFactory<LineItemEntity>({
  id: Factory.each((i) => i) as unknown as number,
  name: '',
  title: Factory.each(() => faker.commerce.productName()) as unknown as string,
  variant_title: Factory.each(() =>
    faker.commerce.productAdjective()
  ) as unknown as string,
  price: Factory.each(() =>
    faker.commerce.price({ min: 5, max: 23 }).toString()
  ) as unknown as string,
  quantity: Factory.each(() =>
    faker.number.int({ min: 1, max: 5 })
  ) as unknown as number,
} as LineItemEntity).withDerivation(
  'name',
  (lineItem) => `${lineItem.title} - ${lineItem.variant_title}`
);
