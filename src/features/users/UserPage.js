import { useSelector } from "react-redux";
import { selectUserById } from './usersSlice';
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from 'react-router-dom';

const UserPage=() =>
{
        const { userId }=useParams();
        const user=useSelector( state => selectUserById( state, Number( userId ) ) );

        //Below Code Will Fix Users Repeated Rerendering Issue
        // const postsForUser=useSelector( selectPostsByUser( Number( userId ) ) ); // Use the selector correctly

        //7
        const { data: postsForUser, isLoading, isSuccess, isError, error }=useGetPostByUserIdQuery( userId );


        let content;
        if ( isLoading )
        {
                content=<p>Loading...</p>
        } else if ( isSuccess )
        {
                //Ids Array , Entities Object
                const { ids, entities }=postsForUser;
                content=ids.map( id =>
                ( <li key={ id }>
                        <Link to={ `/post/${ id }` }>{ entities[ id ].title }</Link>
                </li> )
                )
        } else if ( isError )
        {
                content=<p>{ error }</p>

        }

        return (
                <section>
                        <h2>{ user?.name }</h2>
                        <ul>{ postTitles }</ul>
                </section>
        );
}

export default UserPage;
