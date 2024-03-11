import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { LineItemModel } from './line-item-model';

const productMatrix = {
  Basil: ['Individual'],
  'Bell Pepper': ['Individual'],
  Donation: ['$1', '$5', '$10', '$20'],
  Coleus: ['Individual / Jr. Lime Vine', 'Individual / Jr. Rose'],
  'Green Leaf Begonias': [
    'Individual / Pink',
    'Individual / Red',
    'Individual / White',
  ],
  Impatiens: [
    'Flat / Pink',
    'Flat / Red',
    'Flat / White',
    'Flat / Violet',
    'Flat / Floral Mix',
  ],
  'Ivy Geranium': [
    'Individual / Pink',
    'Individual / White',
    'Individual / Red',
  ],
  'Ivy Geranium Hanging Basket': [
    'Basket / 10" / Pink',
    'Basket / 10" / White',
    'Basket / 10" / Lavender',
    'Basket / 16" / Burgundy & White',
    'Basket / 16" / Pink, Rose, & White',
  ],
  'Janie Marigolds': ['Orange', 'Yellow'],
  Oregano: ['Individual'],
  Rosemary: ['Individual'],
};

const products = Object.keys(productMatrix);
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
} as LineItemModel)
  .withDerivation('variantTitle', (lineItem) => {
    const variants =
      productMatrix[lineItem.title as keyof typeof productMatrix];

    return variants[faker.number.int(variants.length - 1)];
  })
  .withDerivation(
    'name',
    (lineItem) => `${lineItem.title} - ${lineItem.variantTitle}`
  );
