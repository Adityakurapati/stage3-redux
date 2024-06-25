import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostById } from './postsSlice';

const SinglePost=() =>
{
        const { postId }=useParams();
        const post=useSelector( state => selectPostById( state, Number( postId ) ) );

        if ( !post )
        {
                return (
                        <section>
                                <h2>Post Not Found</h2>
                        </section>
                );
        }

        return (
                <article className='bg-slate-300 flex flex-col gap-12'>
                        <h3 className='font-bold text-2xl  font-slate-200 p-4'>{ post.title }</h3>
                        <p className='p-4 text-1xl font-normal text-slate-700'>{ post.body }</p>
                        <p>
                                <Link to={ `/post/edit/${ post.id }` } className='bg-slate-200 py-3 px-7 rounded-2xl'>Edit ThisPost</Link>
                                <PostAuthor userId={ post.userId } />
                                <TimeAgo timestamp={ post.date } />
                        </p>
                        <ReactionButtons post={ post } />
                </article>
        );
};

export default SinglePost;
