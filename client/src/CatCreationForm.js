import React, { useState } from "react";

export const CatCreationForm = ({ onAdd }) => {
  const [cat, setCat] = useState({
    name: "",
    age: 0,
  });

  const handleChange = (event) => {
    const input = event.target;
    const name = input.name;
    const value = input.value;

    setCat((cat) => ({ ...cat, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAdd(cat);

    setCat({
      name: "",
      age: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cat-name">Cat name</label>
        <input
          id="cat-name"
          name="name"
          type="text"
          value={cat.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="cat-age">Cat age</label>
        <input
          id="cat-age"
          name="age"
          type="number"
          min={0}
          value={cat.age}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};
