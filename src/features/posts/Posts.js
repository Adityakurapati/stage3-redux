import { useSelector } from 'react-redux';
import { selectPostIds, fetchPosts, getPostsStatus, getPostsError } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Posts=() =>
{
        const orderedPostIds=useSelector( selectPostIds );
        const postsStatus=useSelector( getPostsStatus );
        const error=useSelector( getPostsError );

        let content='';

        if ( postsStatus==="loading" )
        {
                content=<p>Loading...</p>;
        } else if ( postsStatus==="succeeded" )
        {
                content=orderedPostIds.map( postId => (
                        <PostsExcerpt key={ postId } postId={ postId } />
                ) );
        } else if ( postsStatus==="failed" )
        {
                content=<p>Failed to fetch the posts</p>;
        }

        return (
                <section className=''>
                        { content }
                </section>
        );
};

export default Posts;
