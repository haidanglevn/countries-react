import { createSlice } from "@reduxjs/toolkit";

const favorites =
  localStorage.getItem("Favorites") !== null
    ? JSON.parse(localStorage.getItem("Favorites"))
    : [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: favorites,
  },
  reducers: {
    addFavorite(state, action) {
      if (state.favorites.some((fav) => fav === action.payload)) {
        state.favorites = [...state.favorites];
      }
      state.favorites = [...state.favorites, action.payload];
      localStorage.setItem("Favorites", JSON.stringify(state.favorites));
    },
    removeFavorite(state, action) {
      const newArray = [...state.favorites];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      state.favorites = [...newArray];
    },
    clearFavorites(state, action) {
      localStorage.removeItem("Favorites");
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
