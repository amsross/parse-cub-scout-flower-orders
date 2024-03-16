import { Session, Shopify } from '@shopify/shopify-api';
import { RestResources } from '@shopify/shopify-api/rest/admin/2023-04';
import { FindAllResponse } from '@shopify/shopify-api/rest/base';

export class ShopifyBaseService {
  protected session: Session;

  protected rest: RestResources;

  constructor(shopify: Shopify, session: Session) {
    this.rest = shopify.rest as RestResources;
    this.session = session;
  }

  protected async getAllInternal<Entity, Params>(
    method: (params: Params) => Promise<FindAllResponse<Entity>>,
    params: Params
  ): Promise<Entity[]> {
    const results = [];

    let pageInfo;
    do {
      const response = (await method({
        ...(pageInfo?.nextPage?.query ?? {}),
        ...params,
      })) as FindAllResponse<Entity>;

      results.push(...response.data);

      pageInfo = response.pageInfo;
    } while (pageInfo?.nextPage);

    return results;
  }
}
