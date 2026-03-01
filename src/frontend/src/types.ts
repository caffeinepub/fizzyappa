import type { Product as BackendProduct } from "./backend.d";

// Extended product type with display fields not returned by the backend
export interface LocalProduct extends BackendProduct {
  flavor: string;
  productType: string;
  description: string;
}
