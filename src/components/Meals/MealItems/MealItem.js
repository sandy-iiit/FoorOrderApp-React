import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import {Fragment, useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem=(props)=>{

    const price=`Rs.${props.price.toFixed(2)}`

    const cartCtx=useContext(CartContext)
    const addToCartHandler=(amount)=>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            price:props.price,
            amount:amount,
        })
        console.log(cartCtx)
        console.log('MealItem: '+amount)
    }

    return (
        <Fragment>
        <li className={classes.borders}>
        <div className={classes.meal}>
            <h3>
                {props.name}
            </h3>

            <div className={classes.description}>
                {props.description}
            </div>

            <div className={classes.price}>
                {price}
            </div>
        </div>

        <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}></MealItemForm>
        </div>
    </li>
            <div className={classes.spacer}></div>
        </Fragment>)
}

export default MealItem