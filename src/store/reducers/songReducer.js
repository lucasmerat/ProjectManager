const initState = [
    ];

const songReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_SONGS':
            return [...action.songs];
        case 'CREATE_PROJECT': 
            return [...state];
        case 'CREATE_PROJECT_ERROR': 
            console.error('Error creating project', action.err)
            return action.err;
        case 'DELETE_PROJECT': 
            return [...state];
        case 'DELETE_PROJECT_ERROR': 
            console.error('Error deleting project', action.err);
            return action.err;
        default: 
            return state;
    }
}

export default songReducer