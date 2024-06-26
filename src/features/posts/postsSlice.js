import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from 'axios';

const POST_URL="https://jsonplaceholder.typicode.com/posts";

const initialState={
        posts: [],
        status: 'idle',
        error: null,
        count: 0
};

export const fetchPosts=createAsyncThunk( 'posts/fetchPosts', async () =>
{
        const response=await axios.get( POST_URL );
        return response.data;
} );

export const addNewPost=createAsyncThunk( 'posts/addNewPost', async ( initialPost ) =>
{
        const response=await axios.post( POST_URL, initialPost );
        return response.data;
} );

export const updatePost=createAsyncThunk( 'posts/updatePost', async ( initialPost ) =>
{
        const { id }=initialPost;
        try
        {
                const response=await axios.put( `${ POST_URL }/${ id }`, initialPost ); // Corrected URL
                return response.data;
        } catch ( e )
        {
                return initialPost;
                // status 500 
                // only for testing redux
        }
} );
export const deletePost=createAsyncThunk( '/posts/delete', async ( initialPost ) =>
{
        const { id }=initialPost;
        try
        {
                const response=await axios.delete( `${ POST_URL }/${ id }` );
                console.log( 'Delete response:', response );
                if ( response.status===200 ) return { id };
                return `${ response?.status }: ${ response?.statusText }`;
        } catch ( err )
        {
                console.error( 'Error in deletePost thunk:', err );
                throw err;
        }
} )

export const postsSlice=createSlice( {
        name: "posts",
        initialState,
        reducers: {

                reactionAdded: ( state, action ) =>
                {
                        const { postId, reaction }=action.payload;
                        const existingPost=state.posts.find( post => post.id===postId );
                        if ( existingPost )
                        {
                                existingPost.reactions[ reaction ]++;
                        }
                }, incrementCount: ( state, action ) =>
                {
                        state.count+=1
                }
        },
        extraReducers: ( builder ) =>
        {
                builder
                        .addCase( fetchPosts.pending, ( state, action ) =>
                        {
                                state.status="loading";
                        } )
                        .addCase( fetchPosts.fulfilled, ( state, action ) =>
                        {
                                state.status="succeeded";
                                let min=1;
                                const loadedPosts=action.payload.map( post =>
                                {
                                        post.date=sub( new Date(), { minutes: min++ } ).toISOString();
                                        post.reactions={
                                                thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0
                                        };
                                        return post;
                                } );
                                state.posts=state.posts.concat( loadedPosts );
                        } )
                        .addCase( fetchPosts.rejected, ( state, action ) =>
                        {
                                state.status="failed";
                                state.error=action.error.message;
                        } )
                        .addCase( addNewPost.fulfilled, ( state, action ) =>
                        {
                                action.payload.userId=Number( action.payload.userId );
                                action.payload.date=new Date().toISOString();
                                action.payload.reactions={
                                        thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0
                                };
                                state.posts.push( action.payload );
                        } )
                        .addCase( updatePost.fulfilled, ( state, action ) =>
                        {
                                if ( !action.payload?.id )
                                {
                                        console.log( "Updatation Could Not Complete" );
                                        console.log( action.payload );
                                        return;
                                }
                                const { id }=action.payload;
                                action.payload.date=new Date().toISOString();
                                const posts=state.posts.filter( post => post.id!==id );
                                state.posts=[ ...posts, action.payload ];
                        } )
                        .addCase( deletePost.fulfilled, ( state, action ) =>
                        {
                                console.log( 'Delete action payload:', action.payload );
                                if ( !action.payload?.id )
                                {
                                        console.log( "Post Not Deleted " );
                                        console.log( action.payload );
                                        return;
                                }
                                const { id }=action.payload;
                                state.posts=state.posts.filter( post => post.id!==id );
                                console.log( 'Posts after deletion:', state.posts );
                        } )
        }
} );

export const selectAllPosts=( state ) => state.posts.posts;
export const getPostsStatus=( state ) => state.posts.status;
export const getPostsError=( state ) => state.posts.error;
export const getCount=( state ) => state.posts.count;
export const selectPostById=( state, postId ) => state.posts.posts.find( post => post.id===postId ); // Corrected selector


// only userpage renderd when posts,userId CHnages
// createSelector Accepts 1 or more Input Funs

export const selectPostsByUser=( userId ) => createSelector(
        [ selectAllPosts ],
        ( posts ) => posts.filter( post => post.userId===userId )
);
export const { incrementCount, reactionAdded }=postsSlice.actions;

export default postsSlice.reducer;
