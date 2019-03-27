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

export const deleteProject = (id) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('projects').doc(id).delete().then(()=>{
            dispatch({type:"DELETE_PROJECT"}, id)
        }).catch((err)=>{
            dispatch({type:"DELETE_PROJECT_ERROR", err})
        });
    }
}

export const editLyrics = (id, lyrics) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('projects').doc(id).set({
            ...lyrics, 
            updatedAt: new Date()
        }, { merge:true }).then(()=>{
            dispatch({type:"UPDATE_LYRICS"}, lyrics)
        }).catch((err)=>{
            dispatch({type:"UPDATE_LYRICS_ERROR", err})
        });
    }
}

//here we return a function rather than an object