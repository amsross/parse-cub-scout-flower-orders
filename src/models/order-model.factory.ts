import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { AddressModel } from './address-model';
import { addressModelFactory } from './address-model.factory';
import { LineItemModel } from './line-item-model';
import { lineItemModelFactory } from './line-item-model.factory';
import { OrderModel } from './order-model';

const dens = ['Tiger', 'Wolf', 'Bear', 'Webelos'];
const scoutsByDen = dens.reduce(
  (acc, den) => {
    const scouts = Array.from({ length: 10 }).map(() => {
      const firstName = faker.person.firstName('male');
      const lastName = faker.person.lastName('male');

      return `${firstName} ${lastName}`;
    });

    return { ...acc, [den]: scouts };
  },
  {} as Record<string, string[]>
);

export const orderModelFactory = Factory.Sync.makeFactory<OrderModel>({
  id: Factory.each(() =>
    faker.number.int({ min: 1000000000000, max: 9999999999999 })
  ) as unknown as number,
  name: Factory.each(
    () => `${faker.number.int({ min: 1000, max: 1300 })}`
  ) as unknown as string,
  date: Factory.each(() =>
    faker.date.recent().toISOString()
  ) as unknown as string,
  total: 0,
  scout: null as unknown as string,
  den: Factory.each((i) => dens[i % dens.length]) as unknown as string,
  billingAddress: Factory.each(() =>
    addressModelFactory.build()
  ) as unknown as AddressModel,
  shippingAddress: {} as AddressModel,
  lineItems: Factory.each(() =>
    lineItemModelFactory.buildList(3)
  ) as unknown as LineItemModel[],
} as OrderModel)
  .withDerivation('scout', (order) => {
    const scouts = scoutsByDen[order.den];

    return scouts[faker.number.int(scouts.length - 1)];
  })
  .withDerivation('shippingAddress', (order) => order.billingAddress)
  .withDerivation('total', (order) =>
    order.lineItems.reduce(
      (total: number, lineItem) => total + lineItem.price * lineItem.quantity,
      0
    )
  );
