import React from 'react'
import { Link } from 'react-router-dom';
const Header=() =>
{
        return (
                <header className='Header flex flex-row p-10 justify-between bg-slate-950 text-slate-400 font-bold text-3xl pr-8'>
                        <h1>Reduuxxx Blogs ... </h1>
                        <nav className='flex flex-row list-none gap-10 '>
                                <li className='list-none hover:text-slate-800'><Link to="/" >Home</Link></li>
                                <li className='list-none hover:text-slate-800'>  <Link to="post" >Post</Link></li>
                        </nav>
                </header>
        )
}

export default Header
