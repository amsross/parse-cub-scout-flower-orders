import { AddressModel } from "./address-model";
import { LineItemModel } from "./line-item-model";

export type OrderModel = {
  id: number;
  name: string;
  date: string;
  total: number;
  scout: string;
  den: string;
  billingAddress: AddressModel;
  shippingAddress: AddressModel;
  lineItems: LineItemModel[];
};
