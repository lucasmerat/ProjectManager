import React, { useState } from 'react';
import Todo from '../Todo/'
import TodoForm from '../TodoForm/'
import { pushTodo, completeItem } from '../../../store/actions/songActions'
import { connect } from "react-redux";
import { notify } from "react-notify-toast";

const Todos = ({todos, pushTodo, id}) =>{
    const addTodo = text =>{
        pushTodo(id, text);
        notify.show("Todo added!")
        
    }
    const completeTodo = (todo) =>{
        console.log(completeItem)
        completeItem(id, todo)
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
        todos: state.singleSong.todos
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        completeItem: (id, todo) => dispatch(completeItem(id, todo)),
        pushTodo: (id, todos) => dispatch(pushTodo(id, todos))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Todos);