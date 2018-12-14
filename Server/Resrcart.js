var express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Product  = require('./Models/Product');
const app = express();
const mongoose = require('mongoose');
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

                console.log(req.body.productquantity)
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
router.get('/product/', (req,res)=> {
    console.log(req.body)
        .then(doc =>
            {
                res.status(200).json(doc)
            }
        ).catch(err =>
    {console.log(err)
        res.status(500).json({errors: err})
    })

})
module.exports = router