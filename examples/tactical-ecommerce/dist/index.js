"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const types_1 = require("./types");
const server = (0, fastify_1.default)({ logger: true });
// In-memory data stores
const users = [];
const products = [];
const stocks = [];
const carts = [];
const orders = [];
const payments = [];
// User routes
server.post('/users', async (request, reply) => {
    const data = request.body;
    if ((0, types_1.validateUser)(data)) {
        users.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid User' });
});
server.get('/users', async () => users);
// Product routes
server.post('/products', async (request, reply) => {
    const data = request.body;
    if ((0, types_1.validateProduct)(data)) {
        products.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Product' });
});
server.get('/products', async () => products);
// Stock routes
server.post('/stocks', async (request, reply) => {
    const data = request.body;
    if ((0, types_1.validateStock)(data)) {
        stocks.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Stock' });
});
server.get('/stocks', async () => stocks);
// Cart routes
server.post('/carts', async (request, reply) => {
    const data = request.body;
    if ((0, types_1.validateCart)(data)) {
        carts.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Cart' });
});
server.get('/carts', async () => carts);
// Order routes
server.post('/orders', async (request, reply) => {
    const data = request.body;
    if ((0, types_1.validateOrder)(data)) {
        orders.push({ ...data, _valid: true });
        return reply.status(201).send(data);
    }
    return reply.status(400).send({ error: 'Invalid Order' });
});
server.get('/orders', async () => orders);
// Payment routes
server.post('/payments', async (request, reply) => {
    const data = request.body;
    if ((0, types_1.validatePayment)(data)) {
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
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
