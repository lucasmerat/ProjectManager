const initState = [
];

const singleProjectReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_PROJECT':
            console.log("Loading project with these lyrics " + action.project.lyrics)
            console.log("Loading single project", action)
            return action.project
        case 'LOAD_LYRICS':
            console.log(state,action)
            return action.project.lyrics
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