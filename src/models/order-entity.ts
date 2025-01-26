import { RestResources } from '@shopify/shopify-api/rest/admin/2024-10';

type Order = RestResources['Order']['prototype'];

export type OrderEntity = Pick<
  Order,
  | 'id'
  | 'name'
  | 'total_price'
  | 'created_at'
  | 'note_attributes'
  | 'line_items'
  | 'billing_address'
  | 'shipping_address'
>;
