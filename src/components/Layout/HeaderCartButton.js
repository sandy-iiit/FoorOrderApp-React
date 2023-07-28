import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
const HeaderCartButton =(props)=>{

    const carCtx=useContext(CartContext)

    const numberOfCartItems=carCtx.items.reduce((cur,item)=>{
        return cur+item.amount;
    },0)
    const  {items}=carCtx
    const [btnHiglighted,setBtnHighlighted]=useState(false)
    const btnClass=`${classes.button} ${btnHiglighted? classes.bump:''}`

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setBtnHighlighted(true)

        const timer=setTimeout(()=>{
            setBtnHighlighted(false)
        },300)
        return ()=>{
            clearTimeout(timer)
        }
    },[items])

    return <button className={btnClass} onClick={props.onClick}>

        <span className={classes.icon}> <CartIcon /> </span>
        <span>Your food basket</span>
        <span className={classes.badge}>{numberOfCartItems}</span>

    </button>
}

export default HeaderCartButton