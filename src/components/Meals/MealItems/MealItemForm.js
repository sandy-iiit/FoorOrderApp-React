import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import {useRef, useState} from "react";


const MealItemForm=(props)=>{


    const [amountIsValid,setAmountValid]=useState(true)
    const amountInputRef=useRef();

    const submitFormHandler=(event)=>{
        event.preventDefault();

        const enteredAmount=amountInputRef.current.value;
        const enteredAmountNumber=+enteredAmount
        console.log(enteredAmountNumber)

        if(enteredAmount.trim().length===0||enteredAmountNumber<1||enteredAmountNumber>5){
               setAmountValid(false)
                return;
        }

        props.onAddToCart(enteredAmountNumber);

    }


    return <form className={classes.form} onSubmit={submitFormHandler}>
        <Input ref={amountInputRef}  label={'Amount'} input={{
        id:'amount_'+props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1',
        }
        }/>
        <button type={'submit'} className={classes.rightspace}>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
}

export default MealItemForm