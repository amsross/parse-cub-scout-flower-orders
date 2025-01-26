import { RestResources } from '@shopify/shopify-api/rest/admin/2024-10';

type Order = RestResources['Order']['prototype'];

import { LineItemModel } from '../models';

export const mapLineItemEntityToModel = (
  lineItem: Exclude<Order['line_items'], null>['0']
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
