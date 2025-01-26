import { mapOrderEntityToModel } from '../mappers';
import { OrderEntity, OrderModel } from '../models';

import { ShopifyBaseService } from './shopify-base-service';

export class OrdersService extends ShopifyBaseService {
  async getAll(): Promise<OrderModel[]> {
    const results = await this.getAllInternal<
      OrderEntity,
      { status: string; fulfillment_status: string }
    >(this.rest.Order.all.bind(this.rest.Order), {
      status: 'open',
      fulfillment_status: 'unfulfilled',
    });

    return results.map(mapOrderEntityToModel);
  }
}
