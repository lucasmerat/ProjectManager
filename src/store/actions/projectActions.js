export const loadProjects = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const authorId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .where("authorId", "==", authorId)
      .get()
      .then(data => {
        let projects = [];
        data.forEach(function(doc) {
          let project = doc.data();
          project.id = doc.id;
          projects.push(project);
        });
        dispatch({ type: "LOAD_PROJECTS", projects });
      });
  };
};

export const loadProject = id => {
  console.log("loading single project");
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .where("authorId", "==", authorId)
      .get()
      .then(data => {
        let project;
        data.forEach(doc => {
          if (doc.id === id) {
            project = doc.data();
          }
        });
        dispatch({ type: "LOAD_PROJECT", project, id });
      });
  };
};

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
        updatedAt: new Date(),
        recordings: {},
        todos: ""
      })
      .then(() => {
        console.log(project);
        firestore
          .collection("notifications")
          .add({
            content: `Started writing ${project.title}`,
            time: new Date(),
            createdBy: authorId
          })
          .then(() => {
            dispatch({ type: "CREATE_PROJECT", project });
          });
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
        let projects = getState().firestore.ordered.projects;
        dispatch({ type: "DELETE_PROJECT", projects });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};

export const editLyrics = (id, lyrics, projectTitle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

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
        firestore
          .collection("notifications")
          .add({
            content: `Edited lyrics of ${projectTitle}`,
            time: new Date(),
            createdBy: authorId
          })
          .then(() => {
            dispatch({ type: "UPDATE_LYRICS", id, lyrics });
          });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_LYRICS_ERROR", err });
      });
  };
};

export const saveRecording = (id, recording, projectTitle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    let recordings = { [new Date().toISOString()]: recording };

    firestore
      .collection("projects")
      .doc(id)
      .set(
        {
          recordings: recordings,
          updatedAt: new Date()
        },
        { merge: true }
      )
      .then(() => {
        firestore
          .collection("notifications")
          .add({
            content: `Added recording to ${projectTitle}`,
            time: new Date(),
            createdBy: authorId
          })
          .then(() => {
            dispatch({ type: "SAVE_RECORDING", recordings });
          });
      })
      .catch(err => {
        dispatch({ type: "SAVE_RECORDING_ERROR", err });
      });
  };
};

export const pushTodo = (id, todo) => {
  todo = { text: todo, isCompleted: false };

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    console.log(firebase, firestore);

    firestore
      .collection("projects")
      .doc(id)
      .update({
        todos: firebase.firestore.FieldValue.arrayUnion(todo)
      })
      .then(() => {
        dispatch({ type: "SAVE_TODO", todo });
      })
      .catch(err => {
        dispatch({ type: "SAVE_TODO_ERROR", err });
      });
  };
};

export const completeItem = (id, todo) => {
  console.log("Why is it not running the return statement");
  
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("Hello");
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .doc(id)
      .update({
        todos: firebase.firestore.FieldValue.arrayRemove(todo)
      }).then(() => {
              dispatch({ type: "UPDATE_TODO", todo });
            })
      // .then(() => {
      //   if (todo.isCompleted) {
      //     todo.isCompleted = false;
      //   } else {
      //     todo.isCompleted = true;
      //   }
      //   firestore
      //     .collection("projects")
      //     .doc(id)
      //     .update({
      //       todos: firebase.firestore.FieldValue.arrayUnion(todo)
      //     })
      //     .then(() => {
      //       dispatch({ type: "UPDATE_TODO", todo });
      //     })
      //     .catch(err => {
      //       dispatch({ type: "UPDATE_TODO_ERROR", err });
      //     });
      // });
  };
};
