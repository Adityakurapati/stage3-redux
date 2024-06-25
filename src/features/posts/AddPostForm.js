import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom'
const AddPostForm=() =>
{
        const [ title, setTitle ]=useState( '' );
        const [ description, setDescription ]=useState( '' ); // Corrected variable name
        const [ userId, setUserId ]=useState( '' );
        const dispatch=useDispatch();
        const [ addRequestStatus, setAddRequestStatus ]=useState( 'idle' );
        const navigate=useNavigate();

        const onTitleChanged=( e ) => setTitle( e.target.value );
        const onDescriptionChanged=( e ) => setDescription( e.target.value ); // Corrected variable name
        const onAuthorChanged=( e ) => setUserId( e.target.value );

        const users=useSelector( selectAllUsers );

        const canSave=[ title, description, userId ].every( Boolean )&&addRequestStatus==='idle'; // Corrected variable name

        const onSavePost=async () =>
        {
                if ( canSave )
                {
                        try
                        {
                                setAddRequestStatus( 'pending' );
                                await dispatch( addNewPost( { title, body: description, userId } ) ).unwrap(); // Ensured awaiting
                                setTitle( '' );
                                setDescription( '' ); // Corrected variable name
                                setUserId( '' );
                                navigate( '/' )
                        } catch ( e )
                        {
                                console.error( 'Failed to save the post:', e );
                        } finally
                        {
                                setAddRequestStatus( 'idle' );
                        }
                }
        };

        const userOptions=users.map( ( user ) => (
                <option key={ user.id } value={ user.id }>
                        { user.name }
                </option>
        ) );

        return (
                <section>
                        <h3>Add New Post</h3>
                        <form>
                                <input
                                        type="text"
                                        placeholder="Title"
                                        value={ title }
                                        onChange={ onTitleChanged }
                                />
                                <select id="postAuthor" value={ userId } onChange={ onAuthorChanged }>
                                        <option value="">Select Author</option>
                                        { userOptions }
                                </select>
                                <input
                                        type="text"
                                        placeholder="Description"
                                        value={ description } // Corrected variable name
                                        onChange={ onDescriptionChanged } // Corrected variable name
                                />
                                <button type="button" onClick={ onSavePost } disabled={ !canSave }>
                                        Save Post
                                </button>
                        </form>
                </section>
        );
};

export default AddPostForm;
