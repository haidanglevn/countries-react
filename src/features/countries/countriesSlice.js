import { createSlice } from "@reduxjs/toolkit";
import countriesService from "../../services/countries";

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true,
  },
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countriesService.getAll();
    setTimeout(() => {
      dispatch(getCountries(countries));
      dispatch(isLoading(false));
    }, 4000);
  };
};

export const { getCountries, isLoading } = countrySlice.actions;
export default countrySlice.reducer;
