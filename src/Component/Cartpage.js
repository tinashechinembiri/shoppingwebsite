import React, { Component } from 'react';
import axios from 'axios';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import './Css/Cart.css'
// the witch it comes at night
class Cartpage extends Component {
  constructor()
  {
      super();
      this.state = {
          data: [],
          counter: 0
  }
  }
  onUpdatecart = (clickid, productquantity) =>
    {
        productquantity += this.state.counter+1
        console.log(productquantity)
        fetch('/product/', {
                method: 'PUT',
                body:  JSON.stringify({
                    id:clickid,
                    newquantity:productquantity
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            }
            ).then(function(response){
        return response.json()
        }).then(data => this.setState({data:data}, console.log('check', data)))


    }
    remove = (clickid, productquantity) =>
    {
        fetch('/product/', {
                method: 'DELETE',
                body:  JSON.stringify({
                    id:clickid,
                    productquantity:productquantity
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },

        }
        ).then(function(response){
            return response.json()
        }).then(data => this.setState({data:data}, console.log('check', data)))

    }
  getcart = () =>
  {try {
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
                return cart
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
                        <button onClick={() => this.onUpdatecart(d.id, d.productquantity)}> + </button>
                        <button onClick={() => this.remove(d.id, d.productquantity)}> - </button>
                    </ListGroup>
                )}
            </div>
        );
    }
}
export default Cartpage;