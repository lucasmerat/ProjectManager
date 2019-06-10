const initState = [
    ];

const songReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_SONGS':
            console.log("Loading songs", action, state)
            return [...action.songs];
        case 'CREATE_PROJECT': 
            console.log('Created a project', action, state);
            return [...state];
        case 'CREATE_PROJECT_ERROR': 
            console.log('Error creating project', action.err)
            return action.err;
        case 'DELETE_PROJECT': 
            console.log('Deleted a project', action, state);
            return [...state];
        case 'DELETE_PROJECT_ERROR': 
            console.log('Error deleting project', action.err);
            return action.err;
        default: 
            return state;
    }
}

export default songReducer