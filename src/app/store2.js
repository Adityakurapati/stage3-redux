import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice'
import usersReducer from '../features/users/usersSlice';

const store2=configureStore( {
        reducer: {
                [ apiSlice.reducerPath ]: apiSlice.reducer,
                users: usersReducer,
        },
        // As We are Using RTK QUeries we Need To Include Middlewares
        middleware: getDefaultMiddleware =>
                getDefaultMiddleware().concat( apiSlice.middleware )
        // getDefaultMiddleware() will return An Array
} );

export default store2;
