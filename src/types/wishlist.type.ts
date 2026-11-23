import { ProductI } from "./product.type";

export interface WishlistResponseI {
  status: string;
  count?: number;
  data: WishlistProductI[];
}
export interface WishlistI {
  status: string
  message: string
  data: string[]
}
export interface WishlistIdsResponseI {
  status: string;
  message: string;
  data: string[];
}

export interface WishlistProductI extends ProductI {
  priceAfterDiscount?: number;
}