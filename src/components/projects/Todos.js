import React, { useState } from 'react';
import Todo from './Todo'
import TodoForm from './TodoForm'
import { pushTodo, pushComplete } from '../../store/actions/projectActions'
import { connect } from "react-redux";

const Todos = ({todos, pushTodo, id}) =>{
    const addTodo = text =>{
        pushTodo(id, text)
    }
    const completeTodo = (todo) =>{
        console.log(todo)
        pushComplete(id, todo)
    }
    return(
        <div className="todos">
            <div className="todo-list collection">
                {todos && todos.map((todo, index)=>(
                    <Todo key={index} index={index} todo={todo} completeTodo={completeTodo}/>
                ))}
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        todos: state.singleProject.todos
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        pushTodo: (id, todos) => dispatch(pushTodo(id, todos)),
        pushComplete: (id, todo) => dispatch(pushComplete(id, todo))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todos);