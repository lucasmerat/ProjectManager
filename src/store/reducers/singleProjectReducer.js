const initState = [
];

const singleProjectReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_PROJECT':
            console.log("Loading project with these lyrics " + action.project.lyrics)
            console.log("Loading single project", action)
            action.project.id = action.id
            return action.project
        case 'UPDATE_LYRICS':
            console.log(action)
            state.lyrics = action.lyrics
            console.log('Updated lyrics!', action, state);
            return state;
        case 'UPDATE_LYRICS_ERROR': 
            console.log('Error Updating lyrics', action.err);
            return state;
        case 'SAVE_RECORDING':
            console.log('Saved recording', action,state)
            return state;
        case 'SAVE_RECORDING_ERROR':
            console.log('Error saving recording', action,state)
            return action.err;
        default: 
            return state;
    }
}

export default singleProjectReducer;