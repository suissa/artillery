// Types using nominal semantics (Branded Types)

export type Branded<T, Brand> = T & { readonly __brand: Brand };

export type UserId = Branded<string, 'UserId'>;
export type ProductId = Branded<string, 'ProductId'>;
export type OrderId = Branded<string, 'OrderId'>;
export type CartId = Branded<string, 'CartId'>;
export type PaymentId = Branded<string, 'PaymentId'>;
export type StockId = Branded<string, 'StockId'>;

// Entidades base

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

// Validators

export function validateUser(user: any): user is User {
    return typeof user.id === 'string' && typeof user.name === 'string' && typeof user.email === 'string';
}

export function validateProduct(product: any): product is Product {
    return typeof product.id === 'string' && typeof product.name === 'string' && typeof product.price === 'number';
}

export function validateStock(stock: any): stock is Stock {
    return typeof stock.id === 'string' && typeof stock.productId === 'string' && typeof stock.quantity === 'number';
}

export function validateCart(cart: any): cart is Cart {
    return typeof cart.id === 'string' && typeof cart.userId === 'string' && Array.isArray(cart.items);
}

export function validateOrder(order: any): order is Order {
    return typeof order.id === 'string' && typeof order.userId === 'string' && Array.isArray(order.items) && typeof order.total === 'number';
}

export function validatePayment(payment: any): payment is Payment {
    return typeof payment.id === 'string' && typeof payment.orderId === 'string' && typeof payment.amount === 'number';
}
