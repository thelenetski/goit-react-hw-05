import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const requestData = async (url, thunkAPI) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTU4YmVjZWNmNTM4OTQ3N2RlN2E3MmI1ODRkZDViZiIsIm5iZiI6MTcyMjg3MDkzNy4xODc2MzMsInN1YiI6IjYzODVhZjliMmUwNjk3MDI5MmU0YTYyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.504sSMw6xkLbLg9EtJxY9BlIZvH_Gi1hHxNm_ILzwVY',
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
};

export const fetchMovies = createAsyncThunk('movies/fetchAll', requestData);

export const fetchOutlet = createAsyncThunk('movies/fetchOutlet', requestData);

/*------------Favorites-------------*/

// const FAV_URL = 'https://66c31a60d057009ee9bf1011.mockapi.io/movies';
const FAV_URL = 'https://serva4ok.ddns.net:8040/movies';

export const fetchFavMovies = createAsyncThunk(
  'favmovies/fetchFavMovies',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(FAV_URL);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addFavMovie = createAsyncThunk(
  'favmovies/addFavMovie',
  async (favMovie, thunkAPI) => {
    try {
      const response = await axios.post(FAV_URL, favMovie);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteFavMovie = createAsyncThunk(
  'favmovies/deleteFavMovie',
  async (favMovieId, thunkAPI) => {
    try {
      const response = await axios.delete(`${FAV_URL}/${favMovieId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleWatch = createAsyncThunk(
  'favmovies/toggleWatch',
  async (movie, thunkAPI) => {
    try {
      const response = await axios.put(`${FAV_URL}/${movie.id}`, movie);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
