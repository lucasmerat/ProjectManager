
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    const handleClick = (e) =>{
        props.signOut()
    }
    return (
        <ul className="right">
            <li><NavLink to="/createproject">New Project</NavLink></li>
            <li><NavLink to="/signin" onClick={handleClick}>Log out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">LM</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) =>{
    console.log(state)
    return{

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignedInLinks)