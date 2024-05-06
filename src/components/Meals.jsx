import { useEffect,useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "../UI/Error"; 

const requestConfig= {}


export default function Meals() {
  
  // const [loadMeals,SetLoadMeals]=useState([]);
  // const [pgLoading,setPgLoading] = useState(true);
  const {data:loadMeals,loading,err} = useHttp("http://localhost:3000/meals",requestConfig,[]);
  console.log("loadMeals",loadMeals)
  if (loading){
    return <p className="centre"> Fetching Meals...</p>
  }
  if(!loadMeals){
    return <p>NO Meals found</p>
  }
  if(err){
    return <Error title="Failed to fetch meals" message={err}/>
  }
  // useEffect(() => {
  //   async function FetchData() {
  //     const response = await fetch("http://localhost:3000/meals");
  //     if (!response.ok) {
  //       throw new Error("Unable to fetch Url");
  //       return;
  //     }
  //     const meals = await response.json();
  //     SetLoadMeals(meals);
  //   }
  //   FetchData();
  //   setPgLoading(false);
  // }, []);
  // console.log("res:",loadMeals);
  // if(pgLoading){
  //   return (<div>Loading please wait...</div>)
  // }

  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}
