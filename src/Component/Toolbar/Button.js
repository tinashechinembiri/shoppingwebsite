import React from 'react';
import './Button.css'
//humburger button
const button = props =>(
    console.log(props.click),
    <button className="check" onClick={props.click}>
        <div className="button"/>
        <div className="button"/>
        <div className="button"/>
    </button>

)
export default button;