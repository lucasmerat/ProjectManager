import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="What's next?"
        onChange={e => setValue(e.target.value)}
      />
      <input className="card-button btn pink lighten-1" type="submit" value="Add todo" />
    </form>
  );
};

export default TodoForm;
