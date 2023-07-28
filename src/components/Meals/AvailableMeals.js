import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItems/MealItem";
import axios from 'axios'
import {useEffect, useState} from "react";



const AvailableMeals=()=>{

    const [meals,setMeals]=useState([])
    const [isLoading,setLoading]=useState(true)
    const [httpError,setHttpError]=useState()
    useEffect(()=>{
        const fetchMeals= async ()=>{
            const response= await fetch('https://foodappreact-f3ab1-default-rtdb.firebaseio.com/meals.json')
            const data=await response.json()
            if(!response.ok){
                setHttpError('Something went wrong!')
                throw new Error('Something went wrong!')
            }
            console.log(httpError)
            const loadedmeals=[]

            for(const key in data){
                loadedmeals.push({
                    id:key,
                    name:data[key].name,
                    description:data[key].description,
                    price:data[key].price,
                })
            }


            setMeals(loadedmeals)
            console.log(data)
            setLoading(false)

        }


        fetchMeals().catch(error=>{
            setLoading(false)
            setHttpError(error.message)
        });





        return ()=>{}
    },[])

    if(isLoading){
        return <section >
            <p className={classes.mealsloading}>Loading</p>
        </section>
    }

    if(httpError){
        return <section >
            <p className={classes.mealserror}>{httpError}</p>
        </section>
    }
    const mealsList=meals.map(meal=><MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)
    return <section className={classes.meals}>
       <Card> <ul>
           {mealsList}
       </ul>
       </Card>

    </section>

}


export default AvailableMeals