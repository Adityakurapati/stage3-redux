import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice'
import usersReducer from '../features/users/usersSlice';

const store2=configureStore( {
        reducer: {
                [ apiSlice.reducerPath ]: apiSlice.reducer,
                users: usersReducer,
        },
} );

export default store2;
