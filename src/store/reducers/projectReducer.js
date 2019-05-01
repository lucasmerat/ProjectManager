const initState = [
    ];

const projectReducer = (state = initState ,action) =>{
    switch (action.type){
        case 'LOAD_PROJECTS':
            console.log("Loading projects", action, state)
            return [...action.projects];
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

export default projectReducer