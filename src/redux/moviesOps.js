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

// export const addTask = createAsyncThunk(
//   "tasks/addTask",
//   async (task, thunkAPI) => {
//     try {
//       const response = await axios.post("/tasks", task);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const deleteTask = createAsyncThunk(
//   "tasks/deleteTask",
//   async (taskId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/tasks/${taskId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// export const toggleDone = createAsyncThunk(
//   "tasks/toggleDone",
//   async (task, thunkAPI) => {
//     console.log(task);
//     try {
//       const response = await axios.put(`/tasks/${task.id}`, {
//         done: !task.done,
//       });
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
