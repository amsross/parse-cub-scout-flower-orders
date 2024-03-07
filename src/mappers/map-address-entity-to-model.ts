import { AddressModel } from '../models';
import { AddressEntity } from '../models/address-entity';

export const mapAddressEntityToModel = (
  address: AddressEntity
): AddressModel => {
  const { name, address1, address2, city, province_code, zip, phone } = address;

  if (!name || !address1 || !city || !province_code || !zip) {
    throw new Error('Address is missing required fields');
  }

  return {
    name,
    address1,
    address2,
    city,
    province: province_code,
    zip,
    phone,
  };
};
