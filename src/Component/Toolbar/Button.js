import React from 'react';
import './Button.css'
//humburger button
const button = props =>(
    <button className="check" onclick={props.click}>
        <div className="button"/>
        <div className="button"/>
        <div className="button"/>
    </button>

)
export default button;