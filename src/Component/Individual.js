import React, { Component } from 'react';
import axios from 'axios';


class Individual extends Component {
    constructor()
    {
        super();
        this.state = {
            data:[],
            cart:[],
            count: 1
        }
    }
    getData =()=>{
        try {

    let id =this.props.match.params.id
            return axios.get('/api/'+id)

        }catch (e) {
            console.error(e);
        }

    }
    add = (id) => {
        var found = false;

        var update = this.state.cart.map(
            (cartitems) =>
            {
                if (cartitems.productquantity >=1)
                {
                    found = true;
                    cartitems.productquantity = this.state.count;
                    this.state.count++;
                    return cartitems
                }
                else {
                    return cartitems

                }}

        )
        if (!found)
        {
            update.push({id: this.state.data._id, name:this.state.data.name, Type:this.state.data.Type, price:this.state.data.price, productquantity:this.state.count})

        }
        this.setState({
            cart: update
        });
        fetch('/product/', {
                method: 'POST',

                body: JSON.stringify({
                    _id:update[0].id,
                    productquantity:update[0].productquantity



                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }

            }
        ).then(function(response){
            return response.json()
        }).then(function(body){
            console.log(body);

        })





    }




    displaydata = async () =>
    {
        this.getData()
            .then (response => {return response.data})
            .then(data => this.setState({data}, console.log(data)))


    }
    componentWillMount()
    {
    this.displaydata()



    }

    render() {
        return (
            <div className="Men">
                <div className={'name'}>
                <div className={''}> {this.state.data.name}</div>
                    <div className={'type'}> £ {this.state.data.price}</div>
                <div className={'type'}>  {this.state.data.Type}</div>
                    <div className={'Gender'}> {this.state.data.Gender}</div>



                </div>
                <img className="individualimage" src={this.state.data.productimage} />
                <div> </div>
                <button onClick={() => this.add(this.state.data._id)}>add to cart</button>

            </div>
        );
    }
}

export default Individual;