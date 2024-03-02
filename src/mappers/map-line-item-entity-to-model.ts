import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order';

import { LineItemModel } from '../models';

export const mapLineItemEntityToModel = (
  lineItem: Exclude<Order['line_items'], null>['0'],
): LineItemModel => {
  const id = lineItem.id as number;
  const title = lineItem.title as string;
  const name = lineItem.name as string;
  const variantTitle = lineItem.variant_title as string | null;
  const price = lineItem.price as string;
  const quantity = lineItem.quantity as number;

  return {
    id,
    title,
    name,
    variantTitle,
    price: parseFloat(price),
    quantity,
  };
};
