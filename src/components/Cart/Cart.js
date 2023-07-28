import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart=(props)=>{
    const cartCtx=useContext(CartContext)
    const [checkOut,setCheckOut]=useState(false)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [didSubmit,setDidSubmit]=useState(false)
    const totalAmount=`Rs.${cartCtx.totalAmount.toFixed(2)}`

    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item,amount:1})
    }

    const cartItemRemoveHandler=(id)=>{
        cartCtx.removeItem(id)
    }

    const orderHandler=()=>{
        setCheckOut(true)
    }

    const submitHandler=async (userData)=>{
        setIsSubmitting(true)
        fetch('https://foodappreact-f3ab1-default-rtdb.firebaseio.com/orders.json',
            {
                method:'POST',
                body:JSON.stringify({
                    user:userData,
                    orders:cartCtx.items
                })
            })

        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems=cartCtx.items.map(item=>(
        <CartItem key={item.id} name={item.name} amount={item.amount}
                  price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}>

        </CartItem>))
    const hasItems=cartCtx.items.length>0
    const modalActions= <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        { hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const modalContent=<> {cartItems}
        <div className={classes.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        {checkOut && <Checkout onConfirm={submitHandler} onCancel={props.onClose}/>}
        {!checkOut && modalActions}</>

    const submittingContent=<p>Sending the order data .... </p>
    const submittedContnet=<p>Your order has been placed.</p>
    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && modalContent}
        {isSubmitting && submittingContent}
        {!isSubmitting && didSubmit && submittedContnet}
    </Modal>



    }




export default Cart