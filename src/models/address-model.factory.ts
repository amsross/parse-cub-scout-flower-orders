import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { AddressModel } from './address-model';

export const addressModelFactory = Factory.Sync.makeFactory<AddressModel>({
  name: Factory.each(() => faker.person.fullName()),
  address1: Factory.each(() => faker.location.streetAddress()),
  address2: Factory.each(() => faker.location.secondaryAddress()),
  city: Factory.each(() => faker.location.city()),
  province: Factory.each(() => faker.location.state({ abbreviated: true })),
  zip: Factory.each(() => faker.location.zipCode()),
  phone: Factory.each(() => faker.phone.number()),
});
