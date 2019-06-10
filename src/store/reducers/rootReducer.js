import authReducer from './authReducer'
import songReducer from './songReducer'
import singleProjectReducer from './singleProjectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase' // Syncs auth status with redux store and pops it on firebase property in reducer

const rootReducer = combineReducers({
    auth: authReducer,
    songs: songReducer,
    singleProject: singleProjectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer