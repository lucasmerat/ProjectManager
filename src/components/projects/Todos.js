import React, { useState } from 'react';
import Todo from './Todo'
import TodoForm from './TodoForm'
import { pushTodo } from '../../store/actions/projectActions'
import { connect } from "react-redux";

const Todos = (props) =>{
    const [todos] = useState([
        props.todos
    ]);
    const addTodo = (text) =>{
        const NewTodos = [...todos, { text }];
        props.pushTodo(props.id, NewTodos)
        // setTodos(NewTodos);
    }

    return(
        <div className="todos">
            <div className="todo-list">
                {todos.map((todo, index)=>(
                    <Todo key={index} index={index} todo={todo}/>
                ))}
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    console.log(state)
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