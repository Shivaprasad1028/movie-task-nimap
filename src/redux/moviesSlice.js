import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";

// Async thunk to fetch popular movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  }
);
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRated",
  async (page = 1) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return response.data.results;
  }
);

// Async thunk to fetch upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcoming",
  async (page = 1) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    return response.data.results;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popular: [],
    topRated: [],
    upcoming: [],
    selectedMovie: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Top-Rated Movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Upcoming Movies
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload;
        state.loading = false;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
