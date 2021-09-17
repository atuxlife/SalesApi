const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { Product } = require('../../db');

router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

router.post('/', [
    check('numlote', 'El lote es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio del producto es obligatorio').isNumeric().not().isEmpty(),
    check('cantdisp', 'La cantidad del producto es obligatorio').isNumeric().not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(422).json({ errores: errors.array() });
    }

    const product = await Product.create(req.body);
    res.json(product);

});

router.put('/:productId', async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productId }
    });
    res.json({ success: 'Se ha modificado el producto' });
});

router.delete('/:productId', async (req, res) => {
    await Product.destroy({
        where: { id: req.params.productId }
    });
    res.json({ success: 'Se ha borrado el producto' });
});

module.exports = router;