import { createReadStream } from 'fs';

import csv from 'csvtojson';

import { mapExportedOrderToAddressModel } from '../mappers/map-exported-order-to-address-model';
import { AddressModel, ExportedOrderEntity } from '../models';
import { bufferToJSON, collect } from '../utils/streams';

export class ExportedOrderService {
  protected orders: Map<string, AddressModel> = new Map();

  public async loadOrders(filename: string): Promise<void> {
    const orders = (await new Promise((resolve, reject) => {
      createReadStream(filename)
        .pipe(
          csv({
            checkType: true,
            trim: true,
            output: 'json',
            includeColumns: /(Name|Billing|Shipping)/,
          })
        )
        .pipe(bufferToJSON())
        .pipe(collect())
        .on('data', resolve)
        .on('error', reject);
    })) as ExportedOrderEntity[];

    this.orders = orders.reduce((orders, exportedOrder) => {
      const orderId = exportedOrder.Name;
      const address = mapExportedOrderToAddressModel(exportedOrder);

      if (address.name && address.address1) {
        orders.set(orderId, address);
      }

      return orders;
    }, this.orders);
  }

  public getAddressForOrder(orderId: string): AddressModel | null {
    return this.orders.get(orderId) ?? null;
  }
}
