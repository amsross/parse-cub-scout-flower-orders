import { Session, Shopify } from '@shopify/shopify-api';
import { RestResources } from '@shopify/shopify-api/rest/admin/2024-10';

interface Response<T> {
  data: T[];
  pageInfo?: {
    nextPage?: {
      query: Record<string, unknown>;
    };
  };
}

export class ShopifyBaseService {
  protected session: Session;

  protected rest: RestResources;

  constructor(shopify: Shopify, session: Session) {
    this.rest = shopify.rest as RestResources;
    this.session = session;
  }

  protected async getAllInternal<Entity, Params>(
    method: (
      params: (Params & { session: Session }) | { session: Session }
    ) => Promise<Response<Entity>>,
    params: Params
  ): Promise<Entity[]> {
    const results = [];
    let pageInfo;

    do {
      const response = (await method({
        session: this.session,
        ...(pageInfo?.nextPage?.query ?? params),
      })) as Response<Entity>;

      results.push(...response.data);

      pageInfo = response.pageInfo;
    } while (pageInfo?.nextPage);

    return results;
  }
}
