import { ProductI } from "./product.type"

// export interface AllOrderI {
//   results: number
//   metadata: MetadataI
//   data: DaumI[]
// }

// export interface MetadataI {
//   currentPage: number
//   numberOfPages: number
//   limit: number
//   nextPage: number
// }

// export interface DaumI {
//   shippingAddress?: ShippingAddress
//   taxPrice: number
//   shippingPrice: number
//   totalOrderPrice: number
//   paymentMethodType: string
//   isPaid: boolean
//   isDelivered: boolean
//   _id: string
//   user: User
//   cartItems: CartItem[]
//   createdAt: string
//   updatedAt: string
//   id: number
//   paidAt?: string
// }

// export interface ShippingAddress {
//   details: string
//   phone: string
//   city: string
//   postalCode?: string
// }

// export interface User {
//   _id: string
//   name: string
//   email: string
//   phone: string
// }

// export interface CartItem {
//   count: number
//   _id: string
//   product: ProductI
//   price: number
// }



export interface OrderProductI {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  brand?: {
    name: string;
    image?: string;
  };
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProductI;
}

export interface ShippingAddressI {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface OrderI {
  _id: string;
  id?: number;
  createdAt: string;

  cartItems: OrderItem[];

  totalOrderPrice: number;
  totalPrice?: number;

  paymentMethodType: string;

  isPaid: boolean;
  isDelivered: boolean;

  shippingAddress: ShippingAddressI;
}

export interface OrdersResponseI {
  results?: number;
  data: OrderI[];
}
