import '@shopify/shopify-api/adapters/node';
import 'dotenv/config';

import { ApiVersion, shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-04';

import { mapOrderModelToRowModels } from './mappers';
import { OrdersService } from './services/OrdersService';

const port = process.env.port ?? 3000;
const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET_KEY;
const adminApiAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;

if (!apiKey || !apiSecretKey || !adminApiAccessToken) {
  throw new Error('Missing required environment variables');
}

const shopify = shopifyApi({
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
  const session = shopify.session.customAppSession('cub-pack-65.myshopify.com');

  const ordersService = new OrdersService(shopify, session);
  const orders = await ordersService.getAll();
  const rows = orders.flatMap(mapOrderModelToRowModels);

  console.dir(rows, { depth: 0 });
})();
