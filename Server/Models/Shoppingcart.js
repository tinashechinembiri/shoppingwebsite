
var Shoppingcart = function () {


};
    Shoppingcart.add =(product, productquantity)=>
    {
        var items = [];
        console.log(product)



        if (product.productquantity < (productquantity))
        {
            throw 'unavaliable'
        }
        else
        {

            items.push({id: product._id, name:product.name, Type:product.Type, price:product.price *productquantity, productquantity:productquantity})
            console.log(items)
        }

    };

    Shoppingcart.fidbyid = (product) =>
    {
        return this.items.filter(function(currentid) {

           return currentid._id === product._id;
        })[0];
    }

module.exports = Shoppingcart ;
