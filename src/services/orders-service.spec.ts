import {
  PageInfo,
  PageInfoParams,
  Session,
  Shopify,
} from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';
import { Order } from '@shopify/shopify-api/rest/admin/2023-04/order';
import { FindAllResponse } from '@shopify/shopify-api/rest/base';

import { orderEntityFactory } from '../models/order-entity.factory';

import { OrdersService } from './orders-service';

jest.mock('@shopify/shopify-api');
jest.mock('@shopify/shopify-api/rest/admin/2023-04');

const mockOrder = jest.mocked(restResources.Order);

describe('OrdersService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAll', () => {
    let service: OrdersService;

    beforeEach(() => {
      const shopify = { rest: { Order: mockOrder } } as unknown as Shopify;
      service = new OrdersService(shopify, {} as Session);
    });

    it('should return orders', async () => {
      const data = orderEntityFactory.buildList(4) as unknown as Order[];
      mockOrder.all
        .mockResolvedValueOnce({
          data: data.slice(0, 2),
          headers: {},
          pageInfo: { nextPage: {} as PageInfoParams } as PageInfo,
        } as FindAllResponse<Order>)
        .mockResolvedValueOnce({
          data: data.slice(2, 4),
          headers: {},
        } as FindAllResponse<Order>);

      await expect(service.getAll()).resolves.toEqual(
        data.map(({ id }) => expect.objectContaining({ id }))
      );
    });
  });
});
