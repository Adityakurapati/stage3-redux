import React from 'react'
import { useAddReactionMutation } from './postsSlice';

const ReactionButtons=( { post } ) =>
{

        const [ addReaction ]=useAddReactionMutation();
        const reactionEmojis={
                thumbsUp: "👍", wow: "😲", heart: "💙", rocket: "🚀", coffee: "☕"
        }
        const reactionButtons=Object.entries( reactionEmojis ).map( ( [ name, emoji ] ) =>
        {
                return (
                        <button
                                key={ name }
                                type='button'
                                className={ `reactionButton ${ name } bg-slate-600 p-2 rounded-3xl hover:bg-slate-950 hover:text-white` }
                                onClick={ () =>
                                {
                                        // dispatch( reactionAdded( { postId: post.id, reaction: name } ) )
                                        const newValue=post.reactions[ name ]+1;
                                        addReaction( { postId: post.id, reactions: { ...post.reactions, [ name ]: newValue } } )
                                } }>{ emoji } { post.reactions[ name ] }</button>
                )
        } );

        return <div className='bg-slate-400 p-4 m-2 w-fit flex gap-8 rounded-2xl'>{ reactionButtons }</div>
}

export default ReactionButtons
