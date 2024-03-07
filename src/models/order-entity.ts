import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order';

import { AddressEntity } from './address-entity';
import { LineItemEntity } from './line-item-entity';

export type OrderEntity = Pick<
  Order,
  'id' | 'name' | 'total_price' | 'created_at' | 'note_attributes'
> & {
  line_items: LineItemEntity[];
  shipping_address: AddressEntity;
  billing_address: AddressEntity;
};
