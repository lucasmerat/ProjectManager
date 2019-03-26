export const createProject = (project) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make asynch call to database  -- then dispatch again and pas in action below
        const firestore = getFirestore();
        // console.log(this)
        firestore.collection('projects').add({
            ...project, 
            createdAt: new Date()
        }).then(()=> {
            dispatch({type:"CREATE_PROJECT", project})
        }).catch((err)=>{
            dispatch({type:"CREATE_PROJECT_ERROR", err})
        });
    }
}

//here we return a function rather than an object