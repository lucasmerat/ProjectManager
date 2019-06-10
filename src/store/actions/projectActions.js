export const loadSongs = () => {
  return (dispatch, getState, { getFirestore }) => {
    const authorId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    firestore
      .collection("projects")
      .where("authorId", "==", authorId)
      .get()
      .then(data => {
        let songs = [];
        data.forEach(doc => {
          let song = doc.data();
          song.id = doc.id;
          songs.push(song);
        });
        dispatch({ type: "LOAD_SONGS", songs });
      });
  };
};

export const loadProject = id => {
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
        todos: "",
        chords: ""
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
    let datedRecording = { [new Date().toISOString()]: recording };

    firestore
      .collection("projects")
      .doc(id)
      .set(
        {
          recordings: datedRecording,
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
            dispatch({ type: "SAVE_RECORDING", datedRecording });
          });
      })
      .catch(err => {
        dispatch({ type: "SAVE_RECORDING_ERROR", err });
      });
  };
};

export const deleteRecording = (recordingId, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    console.log(firebase.firestore.FieldValue);
    firestore
      .collection("projects")
      .doc(id)
      .get()
      .then(data => {
        firestore
          .collection("projects")
          .doc(id)
          .update({
            recordings: firebase.firestore.FieldValue.delete()
          })
          .then(() => {
            let song = data.data();
            let updatedRecordings = { ...song.recordings };
            delete updatedRecordings[recordingId];
            firestore
              .collection("projects")
              .doc(id)
              .set(
                {
                  recordings: updatedRecordings,
                  updatedAt: new Date()
                },
                { merge: true }
              )
              .then(() => {
                dispatch({ type: "DELETE_RECORDING", updatedRecordings });
              })
              .catch(err => {
                dispatch({ type: "DELETE_RECORDING_ERROR", err });
              });
          });
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
  console.log(id, todo);

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    console.log(firebase, firestore);
  };
};

export const pushChord = (id, chord, variation, quality) => {
  console.log(quality);
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    let combinedChord = {
      chord,
      variation,
      quality
    };
    console.log(combinedChord);

    firestore
      .collection("projects")
      .doc(id)
      .update({
        chords: firebase.firestore.FieldValue.arrayUnion(combinedChord)
      })
      .then(() => {
        dispatch({ type: "SAVE_CHORD", combinedChord });
      })
      .catch(err => {
        dispatch({ type: "SAVE_CHORD_ERROR", err });
      });
  };
};
