import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const USERS_URL="http://jsonplaceholder.typicode.com/users";

const initialState=[];

export const fetchUsers=createAsyncThunk( 'users/fetchUsers', async () =>
{
        try
        {
                const response=await axios.get( USERS_URL );
                return response.data; // No need to spread the array
        } catch ( e )
        {
                return e.message;
        }
} );

export const usersSlice=createSlice( {
        name: "users",
        initialState,
        reducers: {},
        extraReducers: ( builder ) =>
        {
                builder.addCase( fetchUsers.fulfilled, ( state, action ) =>
                {
                        return action.payload; // Replace the entire state with the fetched users
                } );
        }
} );

export const selectAllUsers=( state ) => state.users;

export default usersSlice.reducer;
