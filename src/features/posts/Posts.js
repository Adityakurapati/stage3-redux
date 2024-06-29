import { useSelector } from 'react-redux';
import { selectPostIds, fetchPosts, getPostsStatus, getPostsError } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostQuery } from './postsSlice'
const Posts=() =>
{
        const orderedPostIds=useSelector( selectPostIds );

        const {
                data: posts,
                isSuccess,
                isLoading
                isError, error
        }=useGetPostQuery();

        let content='';

        if ( isLoading )
        {
                content=<p>Loading...</p>;
        } else if ( isSuccess )
        {
                content=orderedPostIds.map( postId => (
                        <PostsExcerpt key={ postId } postId={ postId } />
                ) );
        } else if ( isError )
        {
                content=<p>{ error }</p>;
        }

        return (
                <section className=''>
                        { content }
                </section>
        );
};

export default Posts;
