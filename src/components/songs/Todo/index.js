import React from 'react';

const Todo = ({todo, completeTodo}) =>{
  return(
    <div className="todo collection-item flex items-center justify-between">
      <span className={todo.isCompleted ? "line-through" : ""}>{ todo.text }</span>
      <label>
        <input type="checkbox" className="filled-in" onChange = {() => {completeTodo(todo)}} checked={todo.isCompleted} />
        <span/>
      </label>
    </div>
  )
}

export default Todo;