export type RowModel = {
  id: number;
  date: string;
  scout: string;
  den: string;

  product: string;
  variant: string | null;
  price: number;
  quantity: number;
  total: number;

  shippingName: string;
  shippingAddress1: string;
  shippingAddress2: string | null;
  shippingCity: string;
  shippingZip: string;
  shippingProvince: string;
  shippingPhone: string | null;
};
