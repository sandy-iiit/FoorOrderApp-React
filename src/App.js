import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {useState} from "react";
import CartProvider from "./store/CartProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
    const router = createBrowserRouter([
        {
            path: "/library",
            element: <CartProvider />,
            children: [
                
            ]
        },
        {

        }
    ])

    const [cartIsShown,setCartShown]=useState(false)

    const showCartHandler=()=>{
        setCartShown(true)
    }

    const hideCartHAndler=()=>{
        setCartShown(false)
    }

  return (
    <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHAndler}/>}

        <Header onShowCart={showCartHandler}></Header>

        <main>
            <Meals/>
        </main>

    </CartProvider>
  );
}

export default App;
