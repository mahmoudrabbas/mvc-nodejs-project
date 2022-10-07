const express = require('express');

const router = express.Router();

const productsController = require("../controllers/products.js");
router.get('/add-product' , productsController.getAddProductPage)
router.post('/add-product' , productsController.addProduct)
router.get('/delete-product/:id' , productsController.deleteProduct)
router.get('/edit-product/:id' , productsController.getEditProduct)
router.post('/edit-product/:id' , productsController.editProduct)


module.exports = router;