export interface ShippingAddress {
  details: string;
  phone?: string;
  city: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderProduct {
  subcategory: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface Order {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: 'cash' | 'card';
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: CartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export type OrdersResponse = Order[];
