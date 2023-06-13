import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import matiereReducer from '../features/matieres/matiereSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matieres: matiereReducer,
  },
})
