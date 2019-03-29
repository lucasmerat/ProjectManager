const initState = [
    ];

const projectReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_PROJECTS':
            console.log(action, state)
            return [...action.projects];
        case 'CREATE_PROJECT': 
            console.log('Created a project', action, state);
            return [...state];
        case 'CREATE_PROJECT_ERROR': 
            console.log('Error creating project', action.err)
            return state;
        case 'DELETE_PROJECT': 
            console.log(action)
            console.log('Deleted a project', action, state);
            console.log(state)
            return [...state];
        case 'DELETE_PROJECT_ERROR': 
            console.log('Error deleting project', action.err);
            return state;
        case 'UPDATE_LYRICS': 
            console.log('Updated lyrics!', action, state);
            return state;
        case 'UPDATE_LYRICS_ERROR': 
            console.log('Error Updating lyrics', action.err);
            return state;
        default: 
            return state;
    }
}

export default projectReducer