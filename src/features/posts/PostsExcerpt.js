import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';
import '../../index.css'
import { React } from 'react'
let PostsExcerpt=( { post } ) =>
{
        return (
                <article key={ post.id } className='bg-slate-300 m-4 rounded-2xl p-4 text-slate-800'>
                        <h3 className='font-bold text-2xl text-slate-500'>{ post.title }</h3>
                        <p>
                                By <b><PostAuthor userId={ post.userId } /></b>
                        </p>
                        <p>{ post.body.substring( 0, 100 ) }</p>
                        <ReactionButtons post={ post } />
                        <TimeAgo timestamp={ post.date } />
                        <Link to={ `post/${ post.id } ` } className='bg-slate-800 text-slate-600 font-sans font-bold py-2 px-3 rounded-2xl'>View Full Post </Link>
                </article>
        )
}

export default PostsExcerpt
