import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import matiereService from './matiereService'

const initialState = {
  matieres: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new matiere
export const createMatiere = createAsyncThunk(
  'matieres/create',
  async (matiereData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await matiereService.createMatiere(matiereData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user matieres
export const getMatieres = createAsyncThunk(
  'matieres/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await matiereService.getMatieres(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user matiere
export const deleteMatiere = createAsyncThunk(
  'matieres/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await matiereService.deleteMatiere(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        console.log(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user matiere
export const updateMatiere = createAsyncThunk(
  'matieres/update',
  async (id,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      return await matiereService.updateMatiere(id, token)
      
    } catch (error) {
      
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        console.log(message)
      return thunkAPI.rejectWithValue(message)
      
    }
  }
)

export const matiereSlice = createSlice({
  name: 'matiere',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMatiere.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMatiere.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.matieres.push(action.payload)
      })
      .addCase(createMatiere.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMatieres.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMatieres.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.matieres = action.payload
      })
      .addCase(getMatieres.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteMatiere.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMatiere.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.matieres = state.matieres.filter(
          (matiere) => matiere._id !== action.payload.id
        )
      })
      .addCase(deleteMatiere.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })


      .addCase(updateMatiere.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMatiere.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.matieres = state.matieres.filter(
          (matiere) => matiere._id !== action.payload.id
        )
      })
      .addCase(updateMatiere.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = matiereSlice.actions
export default matiereSlice.reducer
