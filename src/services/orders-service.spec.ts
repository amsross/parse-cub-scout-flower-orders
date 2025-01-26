import {
  PageInfo,
  PageInfoParams,
  Session,
  Shopify,
} from '@shopify/shopify-api';
// import type { FindAllResponse } from '@shopify/shopify-api/rest/admin';
import {
  type RestResources,
  restResources,
} from '@shopify/shopify-api/rest/admin/2024-10';

import { OrderEntity } from '../models';
import { orderEntityFactory } from '../models/order-entity.factory';

import { OrdersService } from './orders-service';

jest.mock('@shopify/shopify-api');
jest.mock('@shopify/shopify-api/rest/admin/2024-10');

const mockOrder = jest.mocked(restResources['Order']);

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
      const data = orderEntityFactory.buildList(4) as unknown as OrderEntity[];

      mockOrder.all
        .mockResolvedValueOnce({
          data: data.slice(0, 2),
          headers: {},
          pageInfo: { nextPage: {} as PageInfoParams } as PageInfo,
        } as unknown as ReturnType<RestResources['Order']['all']>)
        .mockResolvedValueOnce({
          data: data.slice(2, 4),
          headers: {},
        } as unknown as ReturnType<RestResources['Order']['all']>);

      await expect(service.getAll()).resolves.toEqual(
        data.map(({ id }) => expect.objectContaining({ id }))
      );
    });
  });
});
