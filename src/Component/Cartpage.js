import React, { Component } from 'react';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import './Css/Cart.css'

class Cartpage extends Component {
  constructor()
  {
      super();

      this.state = {

          data: [],


  }



  }
  onUpdatecart = (id) =>
    {
        axios.put('/product/',

            {

            }
            )

    }
  getcart = () =>
  {
      try {
          return axios.get('/product/');

      }catch (e) {
        console.error(e)
      }
  }
  showcart = async () =>
  {
      this.getcart()
          .then (response => {return response.data})
          .then(data => this.setState({data:data}, console.log(data)))

  }


    componentWillMount()
    {
        this.showcart();

    }

    render() {

      let checkid = {}
       const cartitem = this.state.data.filter((cart) =>
       {
           checkid = cart.id;

           if (checkid === cart.id)
           {
               console.log("%checking data",  "color: green")
               cart.productquantity = cart.productquantity;
               cart.price = cart.price
               console.log(cart.productimage)
                return  cart
           }
       }).map(
           (cart) => {


                  return cart
           }

       )
        // objects.value
        var result = Object.values(cartitem.reduce((r,o) => {
            console.log("%check the data", "color: pink")
            console.log(r[o.id])
            r[o.id] = o;
            return r;
        },{}));


        return (
            <div >
                <div className="Basket"> My Basket</div>
                <button >Checkout Securely</button>
                <ul className="infolist"><li>Order details</li> <li>Quantity</li> <li>price</li></ul>

                {result.map( (d) =>
                    <ListGroup className="cartpagelist">
                        <ListGroupItem className="Cartname">{d.name} </ListGroupItem>
                        <ListGroupItem>   <img className="imagecart" src ={d.productimage}/> </ListGroupItem>
                        <ListGroupItem className="Cartname">{d.Type} </ListGroupItem>
                        <ListGroupItem className="Cartnamequantity">{d.productquantity} </ListGroupItem>
                        <ListGroupItem className="Cartnameprice">{d.price} </ListGroupItem>
                    </ListGroup>



                )}
            </div>
        );
    }
}

export default Cartpage;