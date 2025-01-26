import '@shopify/shopify-api/adapters/node';
import 'dotenv/config';

import { Parser } from '@json2csv/plainjs';
import { ApiVersion, LogSeverity, shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-10';

import { mapOrderModelToRowModels } from './mappers';
import { ExportedOrderService } from './services/exported-order-service';
import { OrdersService } from './services/orders-service';

const port = process.env.port ?? 3000;
const shopName = process.env.SHOP_NAME;
const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET_KEY;
const adminApiAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;

if (!shopName || !apiKey || !apiSecretKey || !adminApiAccessToken) {
  throw new Error('Missing required environment variables');
}

const shopify = shopifyApi({
  logger: { level: LogSeverity.Warning },
  apiSecretKey,
  apiKey,
  adminApiAccessToken,
  scopes: ['read_orders'],
  hostName: `localhost:${port}`,
  apiVersion: ApiVersion.October24,
  isCustomStoreApp: true,
  isEmbeddedApp: false,
  restResources,
});

(async () => {
  const exportFile = process.argv[2];

  const exportedOrderService = new ExportedOrderService();
  await exportedOrderService.loadOrders(exportFile);

  const session = shopify.session.customAppSession(shopName);
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

  let csv = '';
  const rows = orders.flatMap(mapOrderModelToRowModels);

  if (rows && rows.length) {
    const parser = new Parser();
    csv = parser.parse(rows);
  }

  console.log(csv);
})();
