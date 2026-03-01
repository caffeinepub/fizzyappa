import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    totalInPaisa: bigint;
    customerName: string;
    status: string;
    deliveryAddress: string;
    customerPhone: string;
    createdAt: bigint;
    deliveryCity: string;
    items: Array<OrderItem>;
}
export interface Product {
    id: bigint;
    name: string;
    priceInPaisa: bigint;
    stock: bigint;
}
export interface OrderItem {
    priceInPaisa: bigint;
    productId: bigint;
    quantity: bigint;
}
export interface backendInterface {
    getAvailableCities(): Promise<Array<string>>;
    getOrders(): Promise<Array<Order>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    placeOrder(customerName: string, customerPhone: string, deliveryCity: string, deliveryAddress: string, items: Array<OrderItem>): Promise<bigint>;
    updateOrderStatus(orderId: bigint, status: string): Promise<void>;
}
