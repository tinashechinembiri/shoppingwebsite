import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import './Css/MenList.css'
import { Link } from 'react-router-dom';

class MenList extends Component {

    render() {
        const items =  this.props.products.map((d) =>
            <ListGroup className="list">   <ListGroupItem className="MenList"> <Link to={`/${d._id}`}>{d.name}</Link> </ListGroupItem>
                <ListGroupItem className="MenList">Type:{d.Type} </ListGroupItem>
                <ListGroupItem className="MenList">Gender: {d.Gender} </ListGroupItem>
                    <ListGroupItem className="image-list" >   <img className="image" src ={d.productimage} /> </ListGroupItem>
                <ListGroupItem className="MenList"> price:£{d.price}</ListGroupItem>
            </ListGroup>)
        console.log(<img className="image" src ={items.productimage} />)

        console.log(this.props.products)
        return (
            <div className="MenList">
                {items}


            </div>
        );
    }
}

export default MenList;