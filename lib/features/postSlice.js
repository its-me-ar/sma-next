const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchPosts = createAsyncThunk("getAllPosts", async () => {
  const resposne = await fetch("http://localhost:4500/api/post");
  return resposne.json();
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default postSlice.reducer;
