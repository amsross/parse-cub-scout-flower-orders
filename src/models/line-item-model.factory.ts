import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { LineItemModel } from './line-item-model';

export const lineItemModelFactory = Factory.Sync.makeFactory<LineItemModel>({
  id: Factory.each((i) => i) as unknown as number,
  name: '',
  title: Factory.each(() => faker.commerce.productName()) as unknown as string,
  variantTitle: Factory.each(() =>
    faker.commerce.productAdjective()
  ) as unknown as string,
  price: Factory.each(() =>
    faker.commerce.price({ min: 5, max: 23 })
  ) as unknown as number,
  quantity: Factory.each(() =>
    faker.number.int({ min: 1, max: 5 })
  ) as unknown as number,
} as LineItemModel).withDerivation(
  'name',
  (lineItem) => `${lineItem.title} - ${lineItem.variantTitle}`
);
