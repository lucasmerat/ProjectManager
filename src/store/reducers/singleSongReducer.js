const initState = [];

const singleSongReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_SONG":
      console.log("Loading single song", action);
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
    case "DELETE_RECORDING":
      console.log("Recording deleted!", action, state);
      const stateWithNewRecordings = {...state};  
      stateWithNewRecordings.recordings = action.updatedRecordings;
      return stateWithNewRecordings;
    case "DELETE_RECORDING_ERROR":
      console.log("Delete recording error!", action, state);
      return action.err;
    case "SAVE_TODO":
      console.log("Saved todo", action, state);
      state.todos = [...state.todos, action.todo];
      return state;
    case "SAVE_TODO_ERROR":
      console.log("Error saving todo", action, state);
      return action.err;
    case "COMPLETE_TODO":
      console.log("Updated todo", action, state);
      const stateWithNewTodo = {...state};
      const filteredTodos = stateWithNewTodo.todos.filter(todo=>todo.text !== action.todo.text);
      filteredTodos.push(action.todo);
      stateWithNewTodo.todos = filteredTodos;
      return stateWithNewTodo;
    case 'COMPLETE_TODO_ERROR':
      console.log('Error saving todo', action,state)
      return action.err;
    case "SAVE_CHORD":
      console.log("Saved chord", action, state);
      state.chords = [...state.chords, action.combinedChord];
      return state;
    case "SAVE_CHORD_ERROR":
      console.log("Saved chord", action, state);
      return action.err;
    default:
      return state;
  }
};

export default singleSongReducer;
