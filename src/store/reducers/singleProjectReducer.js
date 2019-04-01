const initState = [
];

const singleProjectReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_PROJECT':
            console.log(action.project)
            console.log("Loading single project", action,state)
            return action.project
        case 'UPDATE_LYRICS':
            console.log(action)
            state.lyrics = action.lyrics
            console.log('Updated lyrics!', action, state);
            return state;
        case 'UPDATE_LYRICS_ERROR': 
            console.log('Error Updating lyrics', action.err);
            return state;
        default: 
            return state;
    }
}

export default singleProjectReducer;