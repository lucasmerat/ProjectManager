
export const loadProjects = () => {
    console.log('loading projects')
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
        .collection("projects")
        .get()
        .then((data)=>{
            let projects = [];
            data.forEach(function(doc){
                let project = doc.data()
                project.id = doc.id
               projects.push(project)
            })
            dispatch({ type:"LOAD_PROJECTS", projects})
        })
    };
}

export const loadProject = (id) =>{
  console.log('loading single project')
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    firestore.collection("projects")
    .get()
    .then((data)=>{
      let project;
      data.forEach((doc)=>{
        if(doc.id === id){
          project = doc.data()
        }
      })
      dispatch({ type: "LOAD_PROJECT", project });
    })
  }
}

export const createProject = project => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make asynch call to database  -- then dispatch again and pas in action below
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId, 
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();


    firestore
      .collection("projects")
      .doc(id)
      .delete()
      .then(() => {
        let projects = getState().firestore.ordered.projects
        dispatch({ type: "DELETE_PROJECT", projects });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};

export const editLyrics = (id, lyrics) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("projects")
      .doc(id)
      .set(
        {
          lyrics,
          updatedAt: new Date()
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: "UPDATE_LYRICS", id, lyrics });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_LYRICS_ERROR", err });
      });
  };
};

//here we return a function rather than an object
