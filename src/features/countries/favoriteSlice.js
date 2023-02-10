import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlide = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    getFavorites(state, action) {
      state.favorites = action.payload;
    },
    addFavorite(state, action) {
      state.favorites = [...state.favorites, action.payload];
      localStorage.setItem("Favorites",JSON.stringify( state.favorites))
    },
    clearFavorites(state, action) {
        localStorage.removeItem('Favorites');
        state.favorites = [];
    }
  },
});

export const {getFavorites, addFavorite, clearFavorites} = favoriteSlide.actions;
export default favoriteSlide.reducer;