import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { LineItemEntity } from './line-item-entity';

const products = ['Bell Peppers', 'Coleus'];
const variants = ['4.5"', 'Jr. Rose', 'Jr. Lime Vine'];

export const lineItemEntityFactory = Factory.Sync.makeFactory<LineItemEntity>({
  id: Factory.each(() =>
    faker.number.int({ min: 1000000000000, max: 9999999999999 })
  ) as unknown as number,
  name: '',
  title: Factory.each(
    () => products[faker.number.int(products.length - 1)]
  ) as unknown as string,
  variant_title: Factory.each(
    () => variants[faker.number.int(variants.length - 1)]
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
