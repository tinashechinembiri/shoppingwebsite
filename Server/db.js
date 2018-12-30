var express = require('express');
const multer = require('multer');
const router = express.Router();
const Product  = require('./Models/Product');
const mongoose = require('mongoose');


const  storage = multer.diskStorage(
    {
        destination: function (req,file,cb) {
            cb(null,'./uploads/' )
        },
        filename:function (req,file,cb) {
            cb(null,  new Date().toISOString().replace(/:/g, '-')+file.originalname);
        }
    }
);

const fileFilter = (req,file,cb)=> {
    if (file.mimeType ==='image/jpeg'|| file.mimeType==='image/png')
    {
        cb(null,true);
    }
    else
    {
        cb(null,false);
    }
}
const upload = multer(
    {
        storage:storage,limit:
            {
                fileSize: 1024*1024*10
            }
    }
)
router.get('/api/:productid', (req,res)=> {

    const id = req.params.productid;
    Product.findById(id)
        .exec()
        .then(doc =>
            {
                if(doc)
                {
                    console.log(doc)
                    res.status(200).json(doc)
                }else
                {
                    res.status(404).json({message: 'no valid information'})
                }
            }
        ).catch(err =>
    {console.log(err)
        res.status(500).json({errors: err})
    })

})

router.post('/api',upload.single('productimage'), (req,res)=>
    {
        const product = new Product(
            {
                _id:new mongoose.Types.ObjectId(),
                name:req.body.name,
                Type: req.body.Type,
                Gender: req.body.Gender,
                price: req.body.price,
                productquantity: req.body.productquantity,
                productimage: req.file.path
            }
        )

        console.log(req.body)
        product.save()
            .then(
                results => {
                    console.log(results);
                    res.status(201).json(
                        {
                            message:'handling post to json',
                            createdproduct:product
                        });
                }
            ).catch(err=>{console.log(err); res.status(500).json({errors:err})})
    }
)
router.get('/api', (req,res)=> {
console.log(req.body)
    Product.find()
        .exec()
        .then(doc =>
            {
                res.status(200).json(doc)
            }
        ).catch(err =>
    {console.log(err)
        res.status(500).json({errors: err})
    })
})
router.delete('/api/:productid', (req,res) =>
    {
        const id = req.params.productid;
        Product.findByIdAndRemove(id)
            .exec()
            .then(doc =>
                {
                    res.status(200).json({messsage:'items deleted'})
                }
            ).catch(
                err =>
                {
                    console.log(err)
                    res.status(500).json({errors:err})
                }
                )
    }
)
module.exports = router