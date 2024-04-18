import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order';

import { mapOrderEntityToModel } from '../mappers';
import { OrderModel } from '../models';
import { OrderEntity } from '../models/order-entity';

import { ShopifyBaseService } from './shopify-base-service';

export class OrdersService extends ShopifyBaseService {
  async getAll(): Promise<OrderModel[]> {
    // https://shopify.dev/docs/api/admin-rest/2023-04/resources/order#get-orders?status=any
    const results = (await this.getAllInternal<
      Order,
      { status: string; fulfillment_status: string }
    >(this.rest.Order.all.bind(this.rest.Order), {
      status: 'open',
      fulfillment_status: 'unfulfilled',
    })) as unknown as OrderEntity[];

    return results.map(mapOrderEntityToModel);
  }
}
