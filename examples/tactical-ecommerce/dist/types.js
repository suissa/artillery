"use strict";
// Types using nominal semantics (Branded Types)
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
exports.validateProduct = validateProduct;
exports.validateStock = validateStock;
exports.validateCart = validateCart;
exports.validateOrder = validateOrder;
exports.validatePayment = validatePayment;
// Validators
function validateUser(user) {
    return typeof user.id === 'string' && typeof user.name === 'string' && typeof user.email === 'string';
}
function validateProduct(product) {
    return typeof product.id === 'string' && typeof product.name === 'string' && typeof product.price === 'number';
}
function validateStock(stock) {
    return typeof stock.id === 'string' && typeof stock.productId === 'string' && typeof stock.quantity === 'number';
}
function validateCart(cart) {
    return typeof cart.id === 'string' && typeof cart.userId === 'string' && Array.isArray(cart.items);
}
function validateOrder(order) {
    return typeof order.id === 'string' && typeof order.userId === 'string' && Array.isArray(order.items) && typeof order.total === 'number';
}
function validatePayment(payment) {
    return typeof payment.id === 'string' && typeof payment.orderId === 'string' && typeof payment.amount === 'number';
}
