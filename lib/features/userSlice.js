import wrapperApi from "../wrapperApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const signUpUser = createAsyncThunk("signUp", async (payload) => {
  try {
    const options = {
      url: "/register",
      data: {
        ...payload,
      },
    };

    const res = await wrapperApi("post", options);
    return res.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message ?? "Something went wrong")
  }
});

const authSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    message: null,
    isError: false,
    isSucess:false
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSucess=true
      state.message = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.error.message;
      state.isError = true;
    });
  },
});

export default authSlice.reducer;
