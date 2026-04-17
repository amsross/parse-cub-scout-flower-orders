import { RestResources } from '@shopify/shopify-api/rest/admin/2024-10';

type Order = RestResources['Order']['prototype'];

export type OrderEntity = Pick<
  Order,
  | 'id'
  | 'order_number'
  | 'name'
  | 'total_price'
  | 'created_at'
  | 'note'
  | 'note_attributes'
  | 'line_items'
  | 'billing_address'
  | 'shipping_address'
  | 'payment_gateway_names'
>;
