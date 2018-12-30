var express = require('express');

const router = express.Router();
const Product  = require('./Models/Product');

const shoppingcart = require('./Models/Shoppingcart');

router.post
('/product/', (req,res)=> {
    const id = req.params.productid;
console.log(req.body._id)
    Product.findById(req.body._id)
        .exec()
        .then( product=>
        {
            try {

               // console.log(req.body.productquantity)
            shoppingcart.add(product, parseInt(req.body.productquantity));
            Product.productquantity -= parseInt(req.body.productquantity);

                res.status(200).send({ success: true, message: 'Item successfully added to cart' })
                
            }catch (err) {
                console.log(err)
                res.status(403).send({ success: false, message: err+'failed2' })
            }
        }


    )

    }
)
router.put('/product/', (req,res)=>
{
    Product.findById(req.body.id)
        .exec()
        .then(
            product => {

                try {

                    console.log(req.body.id)
                    shoppingcart.updateitem(product, parseInt(req.body.newquantity));
                   Product.productquantity -= parseInt(req.body.productquantity) - parseInt(req.body.newquantity)

                    res.status(200).send({ success: true, message: 'Item successfully added to cart' })

                }catch (err) {
                    console.log(err)
                    res.status(403).send({ success: false, message: err+'failed2' })
                }
            }
        )

})
router.get('/product/', (req,res)=> {

    res.json(shoppingcart.getitems())

})
module.exports = router