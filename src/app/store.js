 import { configureStore } from '@reduxjs/toolkit';
 import countriesSlice from '../features/countries/countriesSlice';
import favoriteSlice from '../features/countries/favoritesSlice';

 export default configureStore({
   reducer: {
     countries: countriesSlice,
     favorites: favoriteSlice
   },
 });
