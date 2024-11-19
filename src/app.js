import express from 'express';
import productsRouter from './routes/productRoutes.js';
import cartsRouter from './routes/cartRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

