const initState = [];

const singleProjectReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_PROJECT":
      console.log("Loading single project", action);
      action.project.id = action.id;
      return action.project;
    case "UPDATE_LYRICS":
      const stateWithNewLyrics = {...state};  
      stateWithNewLyrics.lyrics = action.lyrics;  
      console.log("Updated lyrics!", action, state);
      return stateWithNewLyrics;
    case "UPDATE_LYRICS_ERROR":
      console.log("Error Updating lyrics", action.err);
      return action.err;
    case "SAVE_RECORDING":
      console.log("Saved recording", action, state);
      let date = Object.keys(action.datedRecording);
      let recording = Object.values(action.datedRecording);
      const stateWithNewRecording = {...state};  
      stateWithNewRecording.recordings[date] = recording[0];
      return stateWithNewRecording;
    case "SAVE_RECORDING_ERROR":
      console.log("Error saving recording", action, state);
      return action.err;
    case "SAVE_TODO":
      console.log("Saved todo", action, state);
      state.todos = [...state.todos, action.todo];
      return state;
    case "SAVE_TODO_ERROR":
      console.log("Error saving todo", action, state);
      return action.err;
    case "UPDATE_TODO":
      console.log("Updated todo", action, state);
      state.todos = [...state.todos, action.todo];
      return state;
    case 'UPDATE_TODO_ERROR':
      console.log('Error saving todo', action,state)
      return action.err;
    default:
      return state;
  }
};

export default singleProjectReducer;
