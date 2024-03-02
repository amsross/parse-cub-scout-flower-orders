import { Session, Shopify } from '@shopify/shopify-api';
import { RestResources } from '@shopify/shopify-api/rest/admin/2023-04';

import { mapOrderEntityToModel } from '../mappers';
import { OrderModel } from '../models';

export class OrdersService {
  private session: Session;

  private rest: RestResources;

  constructor(shopify: Shopify, session: Session) {
    this.rest = shopify.rest as RestResources;
    this.session = session;
  }

  async getAll(): Promise<OrderModel[]> {
    const results = [];

    let pageInfo;
    do {
      // https://shopify.dev/docs/api/admin-rest/2023-04/resources/order#get-orders?status=any
      const response = await this.rest.Order.all({
        ...pageInfo?.nextPage?.query,
        status: 'any',
        session: this.session,
      });

      results.push(...response.data);

      pageInfo = response.pageInfo;
    } while (pageInfo?.nextPage);

    return results.map((order) => mapOrderEntityToModel(order));
  }
}
