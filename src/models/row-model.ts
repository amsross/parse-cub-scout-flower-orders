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

  shippingName: string | null;
  shippingAddress1: string | null;
  shippingAddress2: string | null;
  shippingCity: string | null;
  shippingZip: string | null;
  shippingProvince: string | null;
  shippingPhone: string | null;
};
