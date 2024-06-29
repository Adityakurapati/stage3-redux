import
{
        createSelector,
        createEntityAdapter
} from "@reduxjs/toolkit"
import { sub } from 'date-fns';
import axios from 'axios';
import { apiSlice } from "../api/apiSlice";

const POST_URL="https://jsonplaceholder.typicode.com/posts";

const postsAdapter=createEntityAdapter( {
        sortComparer: ( a, b ) => b.date.localeCompare( a.date )
} );

const initialState=postsAdapter.getInitialState( {} );

// Any Post Id Is Invalidated Then All Posts Are Again Rerendered.
export const extendedApiSlice=apiSlice.injectEndpoints( {
        endpoints: builder => ( {
                getPosts: builder.query( {
                        query: () => '/posts',
                        transformResponse: response =>
                        {
                                let min=1;
                                const loadedPosts=response.map( post =>
                                {
                                        if ( !post?.date ) post.date=sub( new Date(), { minutes: min++ } )
                                        if ( !post?.reaction ) post.reaction={
                                                thumbsUp: 0,
                                                wow: 0,
                                                heart: 0,
                                                coffee: 0,
                                                rocket: 0
                                        }
                                } )
                                postsAdapter.setAll( initialState, loadedPosts )
                        },
                        provideTags: ( result, error, arg )
                                => [
                                        { type: 'Post', id: "LIST" },
                                        ...result.ids.map( id => ( { type: 'Post', id } ) )
                                ]
                } ),
                getPostByUserId: builder.query( {
                        query: userId => `/posts/?userId=${ userId }`, transformResponse: response =>
                        {
                                let min=1;
                                const loadedPosts=response.map( post =>
                                {
                                        if ( !post?.date ) post.date=sub( new Date(), { minutes: min++ } )
                                        if ( !post?.reaction ) post.reaction={
                                                thumbsUp: 0,
                                                wow: 0,
                                                heart: 0,
                                                coffee: 0,
                                                rocket: 0
                                        }
                                } )
                                // Not Overide the cache state for request
                                // This would have cache state for request
                                postsAdapter.setAll( initialState, loadedPosts )
                        },
                        provideTags: ( result, error, arg )
                                =>
                        {

                                return [ ...result.ids.map( id => ( { type: 'Post', id } ) ) ]
                        }

                } ),
                addPost: builder.mutation( {
                        query: initialPost =>
                        ( {
                                url: '/posts',
                                method: "POST",
                                body: {
                                        ...initialPost,
                                        userId: Number( initialPost.userId ),
                                        date: new Date().toISOString(),
                                        reactions: {
                                                thumbsUp: 0,
                                                wow: 0,
                                                heart: 0,
                                                coffee: 0,
                                                rocket: 0
                                        }
                                }
                        } ),
                        invalidatesTags: [
                                { type: 'Post', id: "LIST" }
                        ]
                } ),
                updatePost: builder.mutation( {
                        query: initialPost => ( {
                                url: `/posts/${ initialPost.id }`,
                                method: "PUT",
                                body: {
                                        ...initialPost,
                                        data: new Date().toISOString()
                                }
                        } ),
                        invalidatesTags: ( result, error, arg ) => [
                                { type: 'Post', id: arg.id } // Like initialPost.id
                        ]
                } ),
                deletePost: builder.mutation( {
                        query: ( { id } ) => ( {
                                url: '/posts/'+id,
                                method: "DELETE",
                                body: { id }
                        } ),
                        invalidatesTags: ( result, error, arg ) => [
                                { type: 'Post', id: arg.id } // Like initialPost.id
                        ]
                } ),
                // Optimistic Update (we DOnt Want to reload All POsts For each reactions Added) so that We are not invalidating 
                // Ensure user Cant do Multiple for same reaction twice
                // provided all reactions object once 
                addReaction: builder.mutation( {
                        query: ( { postId, reactions } ) => ( {
                                url: `/posts/${ postId }`,
                                method: "PATCH",
                                body: { reactions }
                        } ),
                        // needs Endpoint and cache key argument(undefined Mentioned ),draft  of data 
                        async onQueryStarted ( { postId, reactions }, { dispatch, queryFulfilled } )
                        {

                                // cache update before teh data update on api 
                                const patchResult=dispatch(
                                        extendedApiSlice.util.updateQueryData( 'getPosts', undefined, draft =>
                                        {
                                                //object Lookup -Immer JS WIll Handle
                                                const post=draft.entities[ postId ];
                                                if ( post ) post.reactions=reactions
                                        } )
                                )
                                try
                                {
                                        await queryFulFilled;
                                } catch
                                {
                                        patchResult.undo();
                                }
                        }
                } )
        } )
} )

export const { useGetPostQuery, useGetPostByUserIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation, useAddReactionMutation }=extendedApiSlice;

//Return THe Query Result ,I doesnt isssues The Query 
export const selectPostsResult=extentedEndpoints.endpoints.getPosts.select();


//Creates The memoized Selector 
// Receive input fun, provide one output function
export const selectPostsData=createSelector(
        selectPostsResult,
        postsResult => postsResult.data // Hold Ids[] and entities[]
)
export const {
        selectAll: selectAllPosts,
        selectById: selectPostById,
        selectIds: selectPostIds
}=postsAdapter.getSelectors( state => selectPostsData( state )??initialState );
// It Should Be 1st Null WHen Loading So ??
// nowlech collision operatorleft if null return right 