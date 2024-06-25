import { useSelector } from "react-redux";
import { selectUserById } from './usersSlice'
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";

import { Link, useParams } from 'react-router-dom';

const UserPage=() =>
{
        // String So using Number()
        const { userId }=useParams();
        const user=useSelector( state => selectUserById( state, Number( userId ) ) );


        // useSelector will run every time when action in dispatched (problem) (bcoz of filter it rerender UserPage Every Time )
        // const postForUser=useSelector( state =>
        // {
        //         allPosts=selectAllPosts( state );
        //         return allPosts.filter( post => post.userId==Number( userId ) )
        // } )

        const postForUser=useSelector( state => selectPostsByUser( state, Number( userId ) ) );
        const postTitles=postForUser.map( post => (
                <li>
                        <Link to={ `/post/${ post.id }` } >{ post.title }</Link>
                </li>
        ) )
}
export default UserPage;
