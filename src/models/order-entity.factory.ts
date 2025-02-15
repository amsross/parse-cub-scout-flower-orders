import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { AddressEntity } from './address-entity';
import { addressEntityFactory } from './address-entity.factory';
import { LineItemEntity } from './line-item-entity';
import { lineItemEntityFactory } from './line-item-entity.factory';
import { OrderEntity } from './order-entity';

const dens = ['Tiger', 'Wolf', 'Bear', 'Webelos'];

export const orderEntityFactory = Factory.Sync.makeFactory<OrderEntity>({
  id: Factory.each(() =>
    faker.number.int({ min: 1000000000000, max: 9999999999999 })
  ) as unknown as number,
  name: Factory.each(
    () => `${faker.number.int({ min: 1000, max: 1300 })}`
  ) as unknown as string,
  total_price: null,
  created_at: Factory.each(() =>
    faker.date.recent().toISOString()
  ) as unknown as string,
  line_items: Factory.each(() =>
    lineItemEntityFactory.buildList(faker.number.int({ min: 1, max: 4 }))
  ) as unknown as LineItemEntity[],
  note_attributes: Factory.each((i) => [
    { name: 'Scout Den', value: dens[i % dens.length] },
    { name: 'Scout Name', value: faker.person.fullName() },
  ]) as unknown as Record<string, string>[],
  billing_address: Factory.each(() =>
    addressEntityFactory.build()
  ) as unknown as AddressEntity,
  shipping_address: {} as AddressEntity,
} as OrderEntity)
  .withDerivation('shipping_address', (order) => order.billing_address)
  .withDerivation('total_price', (order) =>
    (order.line_items ?? [])
      .reduce(
        (total, lineItem) =>
          total +
          parseInt(lineItem.price as string) * (lineItem.quantity as number),
        0
      )
      .toString()
  );
