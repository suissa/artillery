import { test, expect } from '@playwright/test';

test('User Adds Product to Cart and Completes Purchase', async ({ request }) => {
  // Given A user exists in the system
  const response1 = await request.post('http://localhost:3000/users', { data: {"id":"u1","name":"John Doe","email":"john@example.com"} });
  expect(response1.status()).toBe(201);
  // Given A product exists in the system
  const response2 = await request.post('http://localhost:3000/products', { data: {"id":"p1","name":"Tactical Gear","price":100} });
  expect(response2.status()).toBe(201);
  // When The user adds the product to the cart
  const response3 = await request.post('http://localhost:3000/carts', { data: {"id":"c1","userId":"u1","items":[{"productId":"p1","quantity":1}]} });
  expect(response3.status()).toBe(201);
  // Then The user places an order
  const response4 = await request.post('http://localhost:3000/orders', { data: {"id":"o1","userId":"u1","items":[{"productId":"p1","quantity":1}],"total":100,"status":"PENDING"} });
  expect(response4.status()).toBe(201);
  // And The user completes the payment
  const response5 = await request.post('http://localhost:3000/payments', { data: {"id":"pay1","orderId":"o1","amount":100,"status":"SUCCESS"} });
  expect(response5.status()).toBe(201);
});
