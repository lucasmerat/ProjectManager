import authReducer from './authReducer'
import songReducer from './songReducer'
import singleSongReducer from './singleSongReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase' // Syncs auth status with redux store and pops it on firebase property in reducer

const rootReducer = combineReducers({
    auth: authReducer,
    songs: songReducer,
    singleSong: singleSongReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer