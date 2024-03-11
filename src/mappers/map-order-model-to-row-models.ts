import { OrderModel, RowModel } from '../models';

export const mapOrderModelToRowModels = (order: OrderModel): RowModel[] => {
  const { lineItems } = order;
  const shippingAddress = {
    shippingName: order.shippingAddress.name,
    shippingAddress1: order.shippingAddress.address1,
    shippingAddress2: order.shippingAddress.address2,
    shippingCity: order.shippingAddress.city,
    shippingZip: order.shippingAddress.zip,
    shippingProvince: order.shippingAddress.province,
    shippingPhone: order.shippingAddress.phone,
  };

  const orderBase = {
    id: parseInt(order.name.replace('#', '')),
    date: order.date,
    den: order.den,
    scout: order.scout,
  };

  return lineItems.map((lineItem) => ({
    ...orderBase,
    ...shippingAddress,
    product: lineItem.title,
    variant: lineItem.variantTitle,
    price: lineItem.price,
    quantity: lineItem.quantity,
    total: lineItem.price * lineItem.quantity,
  }));
};
