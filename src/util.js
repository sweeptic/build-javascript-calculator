export function deepCopyState(state) {
  return {
    ...state,
    memory: [...state.memory],
    editor: [...state.editor],
  };
}
