var express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const Product  = require('./Models/Product');
const app = express();
const mongoose = require('mongoose');

const port = 8020;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://mongo:test1@practiceone-shard-00-00-vcfvo.gcp.mongodb.net:27017,practiceone-shard-00-01-vcfvo.gcp.mongodb.net:27017,practiceone-shard-00-02-vcfvo.gcp.mongodb.net:27017/test?ssl=true&replicaSet=practiceone-shard-0&authSource=admin&retryWrites=true',
    {
        useMongoClient:true
    });
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
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
app.get('/api:productid/', (req,res)=> {

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
app.get('/api/', (req,res)=> {

    Product.find()
        .select(" _id name Type Gender price productimage")
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
app.post('/api',upload.single('productimage'), (req,res)=>
    {

        const product = new Product(
            {
            _id:new mongoose.Types.ObjectId(),
                name:req.body.name,
                Type: req.body.Type,
                Gender: req.body.Gender,
                price: req.body.price,
                productimage:req.file.path
            }
        );
        product.save()
            .then(
                results => {
                    console.log(results)
                    res.status(201).json(
                        {
                            message:'handling post to json',
                            createdproduct:product

                        });
                }
            ).catch(err=>{console.log(err); res.status(500).json({errors:err})})


    }

)

app.listen(port, ()=> console.log('8020 check the data '))