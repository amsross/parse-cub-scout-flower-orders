import { AddressModel } from '../models';
import { ExportedOrderEntity } from '../models/exported-order-entity';

export const mapExportedOrderToAddressModel = (
  exportedOrder: ExportedOrderEntity
): AddressModel => ({
  name: exportedOrder['Shipping Name'] || exportedOrder['Billing Name'],
  address1:
    exportedOrder['Shipping Address1'] || exportedOrder['Billing Address1'],
  address2:
    exportedOrder['Shipping Address2'] || exportedOrder['Billing Address2'],
  city: exportedOrder['Shipping City'] || exportedOrder['Billing City'],
  zip: (exportedOrder['Shipping Zip'] || exportedOrder['Billing Zip'])
    ?.toString()
    .padStart(5, '0'),
  province:
    exportedOrder['Shipping Province'] || exportedOrder['Billing Province'],
  phone: null,
});
