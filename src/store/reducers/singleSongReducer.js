const initState = [];

const singleSongReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_SONG":
      action.project.id = action.id;
      return action.project;
    case "UPDATE_LYRICS":
      const stateWithNewLyrics = { ...state };
      stateWithNewLyrics.lyrics = action.lyrics;
      return stateWithNewLyrics;
    case "UPDATE_LYRICS_ERROR":
      console.error("Error Updating lyrics", action.err);
      return action.err;
    case "SAVE_RECORDING":
      let date = Object.keys(action.datedRecording);
      let recording = Object.values(action.datedRecording);
      const stateWithNewRecording = { ...state };
      stateWithNewRecording.recordings[date] = recording[0];
      return stateWithNewRecording;
    case "SAVE_RECORDING_ERROR":
      console.error("Error saving recording", action, state);
      return action.err;
    case "DELETE_RECORDING":
      const stateWithNewRecordings = { ...state };
      stateWithNewRecordings.recordings = action.updatedRecordings;
      return stateWithNewRecordings;
    case "DELETE_RECORDING_ERROR":
      console.error("Delete recording error!", action, state);
      return action.err;
    case "SAVE_TODO":
      state.todos = [...state.todos, action.todo];
      return state;
    case "SAVE_TODO_ERROR":
      console.error("Error saving todo", action, state);
      return action.err;
    case "COMPLETE_TODO":
      const stateWithNewTodo = { ...state };
      const filteredTodos = stateWithNewTodo.todos.filter(todo => todo.text !== action.todo.text);
      filteredTodos.push(action.todo);
      stateWithNewTodo.todos = filteredTodos;
      return stateWithNewTodo;
    case "COMPLETE_TODO_ERROR":
      console.error("Error saving todo", action, state);
      return action.err;
    case "SAVE_CHORD":
      state.chords = [...state.chords, action.combinedChord];
      return state;
    case "SAVE_CHORD_ERROR":
      console.error("Saved chord", action, state);
      return action.err;
    default:
      return state;
  }
};

export default singleSongReducer;
