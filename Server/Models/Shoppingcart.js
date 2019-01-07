var data = []
var Shoppingcart = function () {


};
    Shoppingcart.add =(product, productquantity)=>
    {
        var current = Shoppingcart.fidbyid(product);

        console.log(current)
        if (product.productquantity < (productquantity))
        {
            throw 'unavaliable'
        }
        else if (current)
        {
             current.productquantity += productquantity;
             current.price += product.price * productquantity;
        }
        else
        {
             data.push({id: product._id, name:product.name, Type:product.Type, price:product.price * productquantity, productquantity:productquantity, productimage:product.productimage})
        }

    };

    Shoppingcart.fidbyid = (product) =>
    {

        return data.filter(function(current) {
            console.log(current)
           return current.id === product._id;
        })[0];
    };
    Shoppingcart.getitems = () =>
    {

        return  data

    }
    Shoppingcart.updateitem = (product,productquantity) =>
    {
        console.log("update cart")
            console.log(Shoppingcart.getitems()[0].id)


        for (var i = 0;  i <Shoppingcart.getitems().length; i++ )
        {
            if (Shoppingcart.getitems()[i].id.toString() === product._id.toString()) {


                if (product.productquantity < (productquantity - Shoppingcart.getitems()[i].productquantity)) {
                    throw 'not enough product availabale'
                }
                else {
                    Shoppingcart.getitems()[i].productquantity = productquantity;
                    Shoppingcart.getitems()[i].price = Shoppingcart.getitems()[i].productquantity * product.price;
                }
            }
            else {
                console.log("something wrong")
            }
        }

    }
    Shoppingcart.removeItem = (product) =>
    {
        var current = Shoppingcart.fidbyid(product);
        var currentindex = data.indexOf(current);
        data.splice(currentindex, 1);
    }

module.exports = Shoppingcart ;
