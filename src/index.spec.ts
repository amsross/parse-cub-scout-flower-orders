import { Session, Shopify } from '@shopify/shopify-api';

import { OrderModel } from './models';
import { orderModelFactory } from './models/order-model.factory';
import { OrdersService } from './services/orders-service';

jest.mock('./services/orders-service');
const ordersServiceMock = jest.mocked(OrdersService);

describe('index', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when the service is called', () => {
    let service: OrdersService;
    let data: OrderModel[];

    beforeEach(() => {
      service = new OrdersService({} as Shopify, {} as Session);
      data = orderModelFactory.buildList(5);

      ordersServiceMock.prototype.getAll.mockResolvedValue(data);
    });

    it('should call the service', async () => {
      await expect(service.getAll()).resolves.toEqual(data);
    });

    it.todo('should group all line items by name/variant');

    it.todo('should show totals by den');

    it.todo('should show totals by scout by den');

    it.todo('should show line items address by scout by den');
  });
});
