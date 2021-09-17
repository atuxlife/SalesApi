const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { Sale, SaleDet, Op } = require('../../db');

router.get('/', async (req, res) => {    
    const sales = await Sale.findAll();
    const salesdets = await SaleDet.findAll();
    let arrOut = outputArr(sales, salesdets);    
    res.json(arrOut);
});

router.post('/', [
    check('user_id', 'El usuario es obligatorio y debe ser numérico').isNumeric().not().isEmpty(),
    check('total', 'El total de la venta es obligatorio y debe ser numérico').isNumeric().not().isEmpty(),
    check('datesale', 'La fecha de venta es obligatorio y debe ser una fecha').isISO8601().toDate().not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(422).json({ errores: errors.array() });
    }

    const sale = await Sale.create(req.body);

    let dataDet = new Array();

    for ( let i = 0; i < req.body.sale_detail.length; i++){
        dataDet.push({
            'sale_id': sale.id,
            'product_id': req.body.sale_detail[i].product_id,
            'cant': req.body.sale_detail[i].cant,
            'subtotal': req.body.sale_detail[i].subtotal
        });
    }

    const saledet = await SaleDet.bulkCreate(dataDet);

    let dataOut = {
        'id': sale.id,
        'user_id': sale.user_id,
        'total': sale.total,
        'datesale': sale.datesale,
        'createdAt': sale.createdAt,
        'updatedAt': sale.updatedAt,
        'sale_detail': []
    }

    for ( let j = 0; j < saledet.length; j++){
        dataOut.sale_detail.push(saledet[j]);
    }
    
    res.json(dataOut);

});

router.post('/history', [
    check('inidate', 'La fecha inicial es obligatoria').not().isEmpty(),
    check('enddate', 'La fecha final es obligatoria').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(422).json({ errores: errors.array() });
    }

    const sales = await Sale.findAll({
        where: {
            datesale: {
                [Op.between]: [req.body.inidate, req.body.enddate]
            }
        }
    });

    res.json(sales);

});

router.delete('/:saleId', async (req, res) => {
    await SaleDet.destroy({
        where: { sale_id: req.params.saleId }
    });
    await Sale.destroy({
        where: { id: req.params.saleId }
    });
    res.json({ success: 'Se ha borrado la venta' });
});

function outputArr(arr1, arr2){

    let arrOut = new Array();

    for ( let i = 0; i < arr1.length; i++){

        arrOut.push({
            'id': arr1[i].id,
            'user_id': arr1[i].user_id,
            'total': arr1[i].total,
            'datesale': arr1[i].datesale,
            'createdAt': arr1[i].createdAt,
            'updatedAt': arr1[i].updatedAt,
            'sale_detail': []
        });

        for ( let j = 0; j < arr2.length; j++){
            if( arrOut[i].id == arr2[j].sale_id ){
                arrOut[i].sale_detail.push(arr2[j]);
            }
        }

    }

    return arrOut;

}

module.exports = router;