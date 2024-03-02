import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order';

import { AddressModel } from '../models';

export const mapAddressEntityToModel = (
  address: Order['shipping_address'],
): AddressModel => {
  const name = address?.name as string | null;
  const address1 = address?.address1 as string | null;
  const address2 = address?.address2 as string | null;
  const city = address?.city as string | null;
  const province = address?.province as string | null;
  const zip = address?.zip as string | null;
  const phone = address?.phone as string | null;

  if (!name || !address1 || !city || !province || !zip) {
    throw new Error('Address is missing required fields');
  }

  return {
    name,
    address1,
    address2,
    city,
    province,
    zip,
    phone,
  };
};
