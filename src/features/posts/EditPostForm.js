import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import { selectPostById, updatePost, deletePost } from './postsSlice';
import { selectAllUsers } from "../users/usersSlice";

const EditPost=() =>
{
        const { postId }=useParams();

        const users=useSelector( selectAllUsers );
        const post=useSelector( state => selectPostById( state, Number( postId ) ) );

        const [ title, setTitle ]=useState( '' );
        const [ description, setDescription ]=useState( '' );
        const [ userId, setUserId ]=useState( '' );
        const [ requestStatus, setRequestStatus ]=useState( 'idle' );

        const dispatch=useDispatch();
        const navigate=useNavigate();

        useEffect( () =>
        {
                if ( post )
                {
                        setTitle( post.title );
                        setDescription( post.body );
                        setUserId( post.userId );
                }
        }, [ post ] );

        if ( !post )
        {
                return (
                        <section>
                                <h2>Post Not Found</h2>
                        </section>
                );
        }

        const onTitleChanged=( e ) => setTitle( e.target.value );
        const onDescriptionChanged=( e ) => setDescription( e.target.value );
        const onAuthorChanged=( e ) => setUserId( Number( e.target.value ) );

        const canSave=[ title, description, userId ].every( Boolean )&&requestStatus==="idle";

        const onSavePost=async () =>
        {
                if ( canSave )
                {
                        try
                        {
                                setRequestStatus( "pending" );
                                await dispatch( updatePost( { id: post.id, title, body: description, userId, reactions: post.reactions } ) ).unwrap();
                                setTitle( '' );
                                setDescription( '' );
                                setUserId( '' );
                                navigate( `/post/${ post.id }` );
                        } catch ( e )
                        {
                                console.error( 'Failed to save the post:', e );
                        } finally
                        {
                                setRequestStatus( "idle" );
                        }
                }
        };

        const userOptions=users.map( user => (
                <option key={ user.id } value={ user.id }>
                        { user.name }
                </option>
        ) );
        const onDeletePost=() =>
        {
                try
                {
                        setRequestStatus( 'pending' );
                        console.log( 'Deleting post:', post.id );
                        dispatch( deletePost( { id: post.id } ) ).unwrap()
                                .then( () =>
                                {
                                        console.log( 'Post deleted successfully' );
                                        setTitle( '' );
                                        setDescription( '' );
                                        setUserId( '' );
                                        navigate( '/' );
                                } )
                                .catch( ( err ) =>
                                {
                                        console.error( 'Error deleting post:', err );
                                } );
                } catch ( err )
                {
                        console.error( 'Error in onDeletePost:', err );
                } finally
                {
                        setRequestStatus( 'idle' );
                }
        }

        return (
                <section>
                        <h2 className="text-black text-3xl font-bold py-9 text-center">Edit Post</h2>
                        <form className="flex flex-col gap-5 bg-slate-800 p-9 rounded-2xl w-1/2 mx-auto m-8">
                                <label htmlFor="postTitle">Post Title:</label>
                                <input
                                        type="text"
                                        id="postTitle"
                                        name="postTitle"
                                        value={ title }
                                        onChange={ onTitleChanged }
                                />
                                <label htmlFor="postAuthor">Author:</label>
                                <select id="postAuthor" value={ userId } onChange={ onAuthorChanged }>
                                        <option value=""></option>
                                        { userOptions }
                                </select>
                                <label htmlFor="postContent">Content:</label>
                                <textarea
                                        id="postContent"
                                        name="postContent"
                                        value={ description }
                                        onChange={ onDescriptionChanged }
                                />
                                <button type="button" className="-inset-x-24 p-2 border-b-red-900 rounded-2xl bg-blue-700" onClick={ onSavePost } disabled={ !canSave }>
                                        Save Post
                                </button>
                                <button type="button" className="-inset-x-24 p-2 border-b-red-900 rounded-2xl bg-red-600" onClick={ onDeletePost } >
                                        Delete Post
                                </button>
                        </form>
                </section>
        );
};

export default EditPost;
