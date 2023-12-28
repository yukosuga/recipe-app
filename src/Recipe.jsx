/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
const Recipe = (props) => {
  const formattedCalories = Number(props.calories).toFixed(2);

  return (
    <div>
      <p>***</p>
      <h2 className="text-3xl text-emerald-700 font-bold p-5">{props.title}</h2>
      <ul className="list-outside">
        {props.ingredients.map((ingredient, index) => (
          <li className="p-1" key={index}>
            {ingredient.text}
          </li>
        ))}
      </ul>
      <p className="p-1">{formattedCalories} cal</p>
      <img className="m-auto p-7" src={props.image} alt={props.label} />
    </div>
  );
};

export default Recipe;
