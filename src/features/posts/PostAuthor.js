import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"
import { Link } from 'react-router-dom'

const PostAuthor=( { userId } ) =>
{
        const users=useSelector( selectAllUsers );
        const author=users.find( user => user.id==userId );
        return ( <span className="py-12 px-8 ">
                - { author? <Link to={ `/user/${ userId }` }>{ author.name }</Link>:'Unknown Author' }
        </span> )
}

export default PostAuthor
