import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersSlice"


const PostAuthor=( { userId } ) =>
{
        const users=useSelector( selectAllUsers );
        const author=users.find( user => user.id==userId );
        return ( <span className="py-12 px-8 ">
                - { author? author.name:'Unknown Author' }
        </span> )
}

export default PostAuthor
