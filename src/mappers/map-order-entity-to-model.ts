import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order';

import { OrderModel } from '../models';

import { mapAddressEntityToModel } from './map-address-entity-to-model';
import { mapLineItemEntityToModel } from './map-line-item-entity-to-model';

const getAttribute = (
  attributes: Order['note_attributes'],
  name: string,
): string | null =>
  (attributes?.find((attr) => attr.name === name)?.value ?? null) as
    | string
    | null;

export const mapOrderEntityToModel = (order: Order): OrderModel => {
  if (!order.id) {
    throw new Error('Order is missing id');
  }

  if (!order.name) {
    throw new Error('Order is missing name');
  }

  if (!order.total_price) {
    throw new Error('Order is missing total price');
  }

  if (!order.created_at) {
    throw new Error('Order is missing created at date');
  }

  const den = getAttribute(order.note_attributes, 'Scout Den');
  const scout = getAttribute(order.note_attributes, 'Scout Name');

  if (!den || !scout) {
    throw new Error('Order is missing required attributes');
  }

  const billingAddress = mapAddressEntityToModel(order.billing_address);
  const shippingAddress = mapAddressEntityToModel(order.shipping_address);
  const lineItems = (order.line_items ?? []).map(mapLineItemEntityToModel);

  return {
    id: order.id,
    name: order.name,
    date: order.created_at,
    total: parseFloat(order.total_price),
    scout,
    den,
    billingAddress,
    shippingAddress,
    lineItems,
  };
};
