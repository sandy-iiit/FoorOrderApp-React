import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const Checkout = (props) => {

    const isEmpty= value=>value.trim()===''
    const isSixChars=value=>value.trim().length===6
    const [formInputsValidity,setFormInputsValidity]=useState({
        name:true,
        street:true,
        city:true,
        postal:true,
    })

    const nameInputRef=useRef()
    const streetInputRef=useRef()
    const postalInputRef=useRef()
    const cityInputRef=useRef()



    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName=nameInputRef.current.value
        const enteredStreet=streetInputRef.current.value
        const enteredPostal=postalInputRef.current.value
        const enteredCity=cityInputRef.current.value

        const enteredNameIsValid=!isEmpty(enteredName)
        const enteredStreetIsValid=!isEmpty(enteredStreet)
        const enteredCityIsValid=!isEmpty(enteredCity)
        const enteredPostalIsValid=isSixChars(enteredPostal)

        const formIsValid= enteredNameIsValid&&enteredCityIsValid&&enteredPostalIsValid&&enteredStreetIsValid

        setFormInputsValidity({
            name:enteredNameIsValid,
            city:enteredCityIsValid,
            street: enteredStreetIsValid,
            postal: enteredStreetIsValid,
        })
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postal:enteredPostal,
        })
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '':classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {! formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '':classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.postal ? '':classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {! formInputsValidity.postal && <p>Plase enter a valid postal.</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '':classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {! formInputsValidity.city && <p>Please enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;