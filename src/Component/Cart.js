import React, { Component } from 'react';


class Cart extends Component {
    constructor()
    {
        super();
        this.state = {
            data:[],


        };

    }

    componentWillReceiveProps(nextProps)
    {


        if (this.props.cart !== nextProps)
        {
                return(
                this.setState({data: nextProps}))
        }
    }

    render() {


console.log(this.props.cart)

        return (
            <div className="Men">
            <div className="cartbox">

              items  {this.props.cart.productquantity || 'empty'}/ £{this.props.cart.price || '0' }

            </div>
            </div>
        );
    }
}

export default Cart;