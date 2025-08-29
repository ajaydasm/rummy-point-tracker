// src/slices/playersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "rummy_players";

const loadState = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : { list: [], targetScore: 320 };
};

const saveState = (state) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

const playersSlice = createSlice({
  name: "players",
  initialState: {
    list: loadState().list,
    gameStarted: loadState().list.length > 1,
    targetScore: loadState().targetScore || 320,
  },
  reducers: {
    addPlayer: (state, action) => {
      const { name, points = 0, avatar } = action.payload; // ✅ destructure avatar too

      if (typeof name !== "string" || !name.trim()) return;

      const isDuplicate = state.list.some(
        (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      if (isDuplicate) return;

      const newPlayer = {
        name: name.trim(),
        points,
        scores: points > 0 ? [points] : [],
        status: "active",
        avatar: avatar || null, // ✅ save avatar if passed
      };

      state.list.push(newPlayer);
      saveState(state);
    },

    deletePlayer: (state, action) => {
      state.list = state.list.filter((p) => p.name !== action.payload);
      saveState(state);
    },

    updatePoints: (state, action) => {
      const { name, pointsToAdd = 0, updatedPlayer = null } = action.payload;

      state.list = state.list.map((p) => {
        if (p.name === name) {
          if (updatedPlayer) return updatedPlayer;

          const newPoints = p.points + pointsToAdd;
          return {
            ...p,
            points: newPoints,
            scores: [...(p.scores || []), pointsToAdd],
            status: newPoints > state.targetScore ? "eliminated" : "active",
          };
        }
        return p;
      });
      saveState(state);
    },

    startGame: (state, action) => {
      if (state.list.length >= 2) {
        state.gameStarted = true;
        state.targetScore = action.payload || 320;
        saveState(state);
      }
    },

    resetGame: (state) => {
      state.list = [];
      state.gameStarted = false;
      state.targetScore = 320;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
});

export const { addPlayer, deletePlayer, updatePoints, startGame, resetGame } =
  playersSlice.actions;

export default playersSlice.reducer;
