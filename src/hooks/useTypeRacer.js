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
  correctCount: 0,
  errorCount: 0,
  accuracy: 100,
  liveWpm: 0,
  leaderboard: getLeaderboard(),
  snackbar: { open: false, message: "", severity: "info" },
});

// State reducer
function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true, startTime: Date.now() };
    case "UPDATE_INPUT": {
      const value = action.payload;
      // compute correctness by comparing against the target text
      let correct = 0;
      for (let i = 0; i < value.length && i < state.text.length; i++) {
        if (value[i] === state.text[i]) correct++;
        else break; // stop at first mismatch for more strict behavior
      }

      const typed = value.length;
      const errors = Math.max(0, typed - correct);

      // live metrics
      const minutes = Math.max(0.001, (state.elapsedTime || 0) / 60000);
      const liveWpm = Math.round(correct / 5 / minutes);
      const accuracy =
        typed > 0 ? Math.max(0, Math.min(100, (correct / typed) * 100)) : 100;

      return {
        ...state,
        userInput: value,
        correctCount: correct,
        errorCount: errors,
        accuracy,
        liveWpm,
      };
    }
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
