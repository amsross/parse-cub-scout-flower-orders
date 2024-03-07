import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { AddressEntity } from './address-entity';

export const addressEntityFactory = Factory.Sync.makeFactory<AddressEntity>({
  name: Factory.each(() => faker.person.fullName()),
  address1: Factory.each(() => faker.location.streetAddress()),
  address2: Factory.each(() => faker.location.secondaryAddress()),
  city: Factory.each(() => faker.location.city()),
  province_code: Factory.each(() =>
    faker.location.state({ abbreviated: true })
  ),
  zip: Factory.each(() => faker.location.zipCode()),
  phone: Factory.each(() => faker.phone.number()),
});
