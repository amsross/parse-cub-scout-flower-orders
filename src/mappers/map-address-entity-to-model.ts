import { AddressModel } from '../models';
import { AddressEntity } from '../models/address-entity';

export const mapAddressEntityToModel = (
  address: AddressEntity
): AddressModel => {
  const { name, address1, address2, city, province_code, zip, phone } =
    address ?? {};

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
