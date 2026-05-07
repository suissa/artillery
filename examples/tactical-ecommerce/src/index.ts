import Fastify from 'fastify';
import {
    User, Product, Stock, Cart, Order, Payment,
    validateUser, validateProduct, validateStock, validateCart, validateOrder, validatePayment
} from './types';

const server = Fastify({ logger: true });

// In-memory data stores
const users: User[] = [];
const products: Product[] = [];
const stocks: Stock[] = [];
const carts: Cart[] = [];
const orders: Order[] = [];
const payments: Payment[] = [];

// User routes
server.post('/users', async (request, reply) => {
    const data = request.body;
    if (validateUser(data)) {
        users.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid User' });
});
server.get('/users', async () => users);

// Product routes
server.post('/products', async (request, reply) => {
    const data = request.body;
    if (validateProduct(data)) {
        products.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Product' });
});
server.get('/products', async () => products);

// Stock routes
server.post('/stocks', async (request, reply) => {
    const data = request.body;
    if (validateStock(data)) {
        stocks.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Stock' });
});
server.get('/stocks', async () => stocks);

// Cart routes
server.post('/carts', async (request, reply) => {
    const data = request.body;
    if (validateCart(data)) {
        carts.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Cart' });
});
server.get('/carts', async () => carts);

// Order routes
server.post('/orders', async (request, reply) => {
    const data = request.body;
    if (validateOrder(data)) {
        orders.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Order' });
});
server.get('/orders', async () => orders);

// Payment routes
server.post('/payments', async (request, reply) => {
    const data = request.body;
    if (validatePayment(data)) {
        payments.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Payment' });
});
server.get('/payments', async () => payments);

const start = async () => {
    try {
        await server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Tactical E-commerce running on http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
