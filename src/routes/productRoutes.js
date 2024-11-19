import { Router } from 'express';
import ProductManager from '../services/productmanager.js';

const router = Router();
const productManager = new ProductManager();

// GET / - Listar todos los productos (con límite opcional)
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const products = await productManager.getAllProducts(limit);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'No se pudieron obtener los productos' });
    }
});

// GET /:pid - Obtener producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: `Producto con ID ${productId} no encontrado` });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'No se pudo obtener el producto' });
    }
});

// POST / - Agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        if (!newProduct) {
            return res.status(404).json({ error: 'El código del producto ya existe o los datos son inválidos' });
        }
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'No se pudo agregar el producto' });
    }
});

// PUT /:pid - Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(productId, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: `Producto con ID ${productId} no encontrado` });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'No se pudo actualizar el producto' });
    }
});

// DELETE /:pid - Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(productId);
        
        if (result.error) {
            return res.status(404).json({ message: `El producto que intentas eliminar no existe: ID ${productId}` });
        }
        
        res.json({ message: `Producto eliminado con éxito: ID ${productId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


export default router;
