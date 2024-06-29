import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header=() =>
{
        const dispatch=useDispatch();
        return (
                <header className='Header flex flex-row p-10 justify-between bg-slate-950 text-slate-400 font-bold text-3xl pr-8'>
                        <h1>Reduuxxx Blogs ... </h1>
                        <nav className='flex flex-row list-none gap-10 '>
                                <li className='list-none hover:text-slate-800'><Link to="/" >Home</Link></li>
                                <li className='list-none hover:text-slate-800'>  <Link to="post" >Post</Link></li>
                                <li className='list-none hover:text-slate-800'>  <Link to="user" >Users</Link></li>
                                {/* <button onClick={ () => dispatch( incrementCount() ) }>{ count }</button> */ }
                        </nav>
                </header>
        )
}

export default Header
