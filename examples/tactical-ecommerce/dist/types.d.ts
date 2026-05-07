export type Branded<T, Brand> = T & {
    readonly __brand: Brand;
};
export type UserId = Branded<string, 'UserId'>;
export type ProductId = Branded<string, 'ProductId'>;
export type OrderId = Branded<string, 'OrderId'>;
export type CartId = Branded<string, 'CartId'>;
export type PaymentId = Branded<string, 'PaymentId'>;
export type StockId = Branded<string, 'StockId'>;
export interface User {
    id: UserId;
    name: string;
    email: string;
    _valid: boolean;
}
export interface Product {
    id: ProductId;
    name: string;
    price: number;
    _valid: boolean;
}
export interface Stock {
    id: StockId;
    productId: ProductId;
    quantity: number;
    _valid: boolean;
}
export interface CartItem {
    productId: ProductId;
    quantity: number;
}
export interface Cart {
    id: CartId;
    userId: UserId;
    items: CartItem[];
    _valid: boolean;
}
export interface Order {
    id: OrderId;
    userId: UserId;
    items: CartItem[];
    total: number;
    status: 'PENDING' | 'COMPLETED';
    _valid: boolean;
}
export interface Payment {
    id: PaymentId;
    orderId: OrderId;
    amount: number;
    status: 'SUCCESS' | 'FAILED';
    _valid: boolean;
}
export declare function validateUser(user: any): user is User;
export declare function validateProduct(product: any): product is Product;
export declare function validateStock(stock: any): stock is Stock;
export declare function validateCart(cart: any): cart is Cart;
export declare function validateOrder(order: any): order is Order;
export declare function validatePayment(payment: any): payment is Payment;
