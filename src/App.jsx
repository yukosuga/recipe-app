import {useState, useEffect, useRef} from "react";
import "./App.css";
import Recipe from "./Recipe.jsx";

function App() {
  const APP_ID = "d458a02e";
  const APP_KEY = "5c2927004d3aa365eec3be1767747400";

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`
      );

      if (!response.ok) {
        throw new Error("There is an error.");
      }
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.log("There is an error.", error);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="app">
      <h1 className="text-center text-5xl text-amber-600 m-7">Recipe Finder</h1>
      <form className="text-center p-5" onSubmit={getSearch}>
        <input
          className="text-xl italic placeholder:text-slate-400 p-2 border-2 rounded w-80"
          placeholder="Enter ingredient (e.g.,banana)"
          ref={inputRef}
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="text-2xl m-2 p-2 bg-slate-100 rounded" type="submit">
          search
        </button>
      </form>

      <div className="text-center text-zinc-800 text-xl">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
