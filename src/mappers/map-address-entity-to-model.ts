import { RestResources } from '@shopify/shopify-api/rest/admin/2024-10';

import { AddressModel } from '../models';

type Order = RestResources['Order']['prototype'];

export const mapAddressEntityToModel = (
  address: Exclude<Order['shipping_address'], null> | null
): AddressModel => {
  const name = address?.name as string | null;
  const address1 = address?.address1 as string | null;
  const address2 = address?.address2 as string | null;
  const city = address?.city as string | null;
  const province_code = address?.province_code as string | null;
  const zip = address?.zip as string | null;
  const phone = address?.phone as string | null;

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
