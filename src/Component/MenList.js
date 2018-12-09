import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import './Css/MenList.css'

class MenList extends Component {
    render() {
        const items =  this.props.products.map((d) =>
            <ListGroup className="list">   <ListGroupItem className="MenList"> name :{d.name} </ListGroupItem>
                <ListGroupItem className="MenList">Type:{d.Type} </ListGroupItem>
                <ListGroupItem className="MenList">Gender: {d.Gender} <img className="image" src={d.productimage}/> </ListGroupItem>
                <ListGroupItem className="MenList"> price:£{d.price}</ListGroupItem>
            </ListGroup>)

        console.log(this.props.products)
        return (
            <div className="MenList">
                {items}

            </div>
        );
    }
}

export default MenList;