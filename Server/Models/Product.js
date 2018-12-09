const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(

    {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        Type:String,
        Gender:String,
        price:Number,
        productimage:{type: String }
    }
);

module.exports = mongoose.model('product',ProductSchema );