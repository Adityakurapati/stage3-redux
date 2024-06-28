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
export const expandedEndpoints=apiSlice.injectEndpoints( {
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
                } )
        } )
} )

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