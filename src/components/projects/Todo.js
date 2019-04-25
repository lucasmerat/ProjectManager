import React from 'react';

const Todo = ({todo, index, completeTodo}) =>{
    return(
        <div style={{textDecoration: todo.isCompleted ? 'line-through' : ''}}className="todo collection-item">
            { todo.text }
            <div className="">
                <button onClick = {() => {completeTodo(todo)}}>X</button>
            </div>
            <input type="checkbox"/>
        </div>
    )
}

export default Todo;