import React, {useState} from 'react';
import Axios from "axios";
import { v4 as uuidv4} from "uuid";
import "./App.css";
import Recipe from './components/Recipe';
import Alert from "./components/Alert";

const App = () => {
    const [query , setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    
    const APP_ID ="1f75b22e";

    const APP_KEY="8d3f9be688d4a3574e287d1c4a3b7862";

    const url =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async () => {
        if (query !== "") {
          const result = await Axios.get(url);
          if (!result.data.more) {
            return setAlert("No food with such name");
          }
          console.log(result);
          setRecipes(result.data.hits);
          setQuery("");
          setAlert("");
        } else {
          setAlert("Enter Food Name");
        }
      };
    const onChange = e =>{
        setQuery(e.target.value); 
    }

    const onSubmit = e =>{
        e.preventDefault();
        getData();
    }

    return (
        <div className="App">
          <h1>Food Searching App</h1>
          <form onSubmit={onSubmit} className="search-form">
            {alert !== "" && <Alert alert={alert} />}
            <input
              type="text"
              name="query"
              onChange={onChange}
              value={query}
              autoComplete="off"
              placeholder="Search Your Favourite Food!!!"
            />
            <input type="submit" value="Search" />
          </form>
          <div className="recipes">
            {recipes !== [] &&
              recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
          </div>
        </div>
      );
    }

export default App
