export type RowModel = {
  id: number;
  date: string;
  scout: string;
  den: string;

  price: number;
  quantity: number;
  title: string;
  variantTitle: string | null;

  shippingName: string;
  shippingAddress1: string;
  shippingAddress2: string | null;
  shippingCity: string;
  shippingZip: string;
  shippingProvince: string;
  shippingPhone: string | null;
};
