
import classes from './Input.module.css'
import React from "react";
const Input=React.forwardRef((props,ref)=>{

    return <div className={classes.input}>

        <label className={classes.leftspace} htmlFor={props.input.id}>
            {props.label}
        </label>

        <input ref={ref} {...props.input}/>
        {/*//here the spread operator makes sure that the input inherits all the properties*/}
    </div>
})

export default Input