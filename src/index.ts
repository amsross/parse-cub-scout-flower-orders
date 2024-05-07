import '@shopify/shopify-api/adapters/node';
import 'dotenv/config';

import { Parser } from '@json2csv/plainjs';
import { ApiVersion, LogSeverity, shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';

import { mapOrderModelToRowModels } from './mappers';
import { ExportedOrderService } from './services/exported-order-service';
import { OrdersService } from './services/orders-service';

const port = process.env.port ?? 3000;
const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET_KEY;
const adminApiAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;

if (!apiKey || !apiSecretKey || !adminApiAccessToken) {
  throw new Error('Missing required environment variables');
}

const shopify = shopifyApi({
  logger: { level: LogSeverity.Warning },
  apiSecretKey,
  apiKey,
  adminApiAccessToken,
  scopes: ['read_orders'],
  hostName: `localhost:${port}`,
  apiVersion: ApiVersion.April23,
  isCustomStoreApp: true,
  isEmbeddedApp: false,
  restResources,
});

(async () => {
  const exportedOrderService = new ExportedOrderService();
  await exportedOrderService.loadOrders(
    '/Users/mattross/Desktop/cub-pack-65/shopify_orders_export_20240506.csv'
  );

  const session = shopify.session.customAppSession('cub-pack-65.myshopify.com');
  const ordersService = new OrdersService(shopify, session);
  const orders = (await ordersService.getAll()).map((order) => {
    const address =
      exportedOrderService.getAddressForOrder(order.name) ??
      order.shippingAddress;

    return {
      ...order,
      shippingAddress: address,
    };
  });

  const rows = orders.flatMap(mapOrderModelToRowModels);
  const parser = new Parser();
  const csv = parser.parse(rows);

  console.log(csv);
})();
