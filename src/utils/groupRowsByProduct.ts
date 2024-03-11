import { RowModel } from '../models';

import { groupBy } from './groupBy';

export const groupRowsByProduct = groupBy<RowModel>(
  ({ product, variant }) => `${product} - ${variant}`
);
