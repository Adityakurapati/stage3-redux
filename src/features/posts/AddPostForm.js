import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddPostMutation } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom'
const AddPostForm=async () =>
{
        const [ title, setTitle ]=useState( '' );
        const [ description, setDescription ]=useState( '' ); // Corrected variable name
        const [ userId, setUserId ]=useState( '' );
        const navigate=useNavigate();

        const onTitleChanged=( e ) => setTitle( e.target.value );
        const onDescriptionChanged=( e ) => setDescription( e.target.value ); // Corrected variable name
        const onAuthorChanged=( e ) => setUserId( e.target.value );

        const users=useSelector( selectAllUsers );

        const canSave=[ title, description, userId ].every( Boolean )&&!isLoading // Corrected variable name

        const [ addPost, { isLoading } ]=useAddPostMutation();

        const onSavePost=async () =>
        {
                if ( canSave )
                {
                        try
                        {
                                await addPost( { title, body: description, userId } ).unwrap()
                                setTitle( '' );
                                setDescription( '' ); // Corrected variable name
                                setUserId( '' );
                                navigate( '/' )
                        } catch ( e )
                        {
                                console.error( 'Failed to save the post:', e );
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
