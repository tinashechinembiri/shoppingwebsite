import React, { Component } from 'react';
import MenList from "./MenList";
import './Css/MenList.css'


class Men extends Component {
    constructor()
    {
        super();
        this.state ={

            products:[

            ]
        }
    }
    componentWillMount()
    {
            fetch('/api')
             .then (response => {return response.json()})
                .then(products => this.setState({products}, console.log(products)))

    }
    render() {

        return (
            <div className="Men">

                <MenList products={this.state.products} key={this.state.products._id}/>
            </div>
        );
    }
}

export default Men;
