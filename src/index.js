import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store2 from './app/store2'; // Ensure this path is correct
import App from './App';
import { fetchUsers } from './features/users/usersSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { extendedApiSlice } from './features/posts/postsSlice';
import './index.css'; // Import the Tailwind CSS file
// Dispatch the fetchUsers thunk action

store2.dispatch( extentedApiSlice.endpoints.getPosts.initiate() )
store2.dispatch( fetchPosts() );

const container=document.getElementById( 'root' );
const root=createRoot( container );

root.render(
        // Provider must be sarouned to provide data  for entire app
        <Provider store={ store2 }>
                <Router>
                        <Routes>
                                <Route path="/*" element={ <App /> } />
                        </Routes>
                </Router>
        </Provider>
);
