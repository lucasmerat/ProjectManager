export const createProject = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asynch call to database  -- then dispatch again and pas in action below
        const firestore = getFirestore();
        firestore.collection('projects').add({
            ...project, 
            authorFirstName:'John',
            authorLastName:'Jill',
            authorId:12345,
            createdAt: new Date()
        }).then(()=> {
            dispatch({type:"CREATE_PROJECT", project})
        }).catch((err)=>{
            dispatch({type:"CREATE_PROJECT_ERROR", err})
        });
    }
}

//here we return a function rather than an object