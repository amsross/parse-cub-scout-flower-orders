import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { LineItemModel } from './line-item-model';

const products = ['Bell Peppers', 'Coleus'];
const variants = ['4.5"', 'Jr. Rose', 'Jr. Lime Vine'];

export const lineItemModelFactory = Factory.Sync.makeFactory<LineItemModel>({
  id: Factory.each(() =>
    faker.number.int({ min: 1000000000000, max: 9999999999999 })
  ) as unknown as number,
  name: '',
  title: Factory.each(
    () => products[faker.number.int(products.length - 1)]
  ) as unknown as string,
  variantTitle: Factory.each(
    () => variants[faker.number.int(variants.length - 1)]
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
