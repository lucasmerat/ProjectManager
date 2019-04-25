import React, { useState } from 'react';
import Todo from './Todo'
import TodoForm from './TodoForm'
import { pushTodo } from '../../store/actions/projectActions'
import { connect } from "react-redux";

const Todos = ({todos, pushTodo, id}) =>{
    // const [todos, setTodos] = useState([
    //    {text: "First thing"},
    //    {text: "second thing"},
    //    {text: "third thing"},

    // ]);
    const addTodo = (text) =>{
        pushTodo(id, text)
        // setTodos(newTodos);
    }

    return(
        <div className="todos">
            <div className="todo-list">
                {todos && todos.map((todo, index)=>(
                    <Todo key={index} index={index} todo={todo}/>
                ))}
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        todos: state.singleProject.todos
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        pushTodo: (id, todos) => dispatch(pushTodo(id, todos))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todos);