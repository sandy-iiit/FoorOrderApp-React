
import mealsimg from '../../assets/meals.jpeg'

import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header=(props)=>{

    return <>

        <header className={classes.header}>
            <h1>Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsimg} alt={'A complete meal'} />
        </div>
    </>

}

export default Header