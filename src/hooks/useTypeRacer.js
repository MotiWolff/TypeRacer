import { useReducer, useEffect } from "react";
import { getLeaderboard, updateLeaderboard } from "../utils/leaderboard";

// Initial state factory
const initialState = (text) => ({
  text,
  userInput: "",
  startTime: null,
  elapsedTime: 0,
  isRunning: false,
  isFinished: false,
  mistake: false,
  leaderboard: getLeaderboard(),
  snackbar: { open: false, message: "", severity: "info" },
});

// State reducer
function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true, startTime: Date.now() };
    case "UPDATE_INPUT":
      return { ...state, userInput: action.payload };
    case "TICK":
      // Calculate elapsed time since start
      return { ...state, elapsedTime: Date.now() - state.startTime };
    case "MISTAKE":
      return { ...state, mistake: true };
    case "FIXED":
      return { ...state, mistake: false };
    case "FINISH":
      return {
        ...state,
        isRunning: false,
        isFinished: true,
        leaderboard: updateLeaderboard(action.payload),
        snackbar: {
          open: true,
          message: `${action.payload.name} — ${action.payload.wpm} WPM`,
          severity: "success",
        },
      };
    case "RESET":
      // Preserve leaderboard across resets
      return { ...initialState(state.text), leaderboard: state.leaderboard };
    case "SNACK_CLOSE":
      return { ...state, snackbar: { ...state.snackbar, open: false } };
    default:
      return state;
  }
}

export function useTypeRacer(selectedText) {
  // Initialize state with the selected text
  const [state, dispatch] = useReducer(reducer, selectedText, initialState);

  // Timer Logic - updates elapsed time every 100ms while running
  useEffect(() => {
    let interval;
    if (state.isRunning) {
      interval = setInterval(() => dispatch({ type: "TICK" }), 100);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  return { state, dispatch };
}
