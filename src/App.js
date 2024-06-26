import './App.css';
import Counter from './features/counter/Counter';
import AddPostForm from './features/posts/AddPostForm';
import Posts from './features/posts/Posts';
import SinglePost from './features/posts/SinglePost';
import EditPostForm from './features/posts/EditPostForm';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom'; // Correctly importing Navigate
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

function App ()
{
        return (
                <Routes>
                        <Route path="/" element={ <Layout /> }>
                                <Route index element={ <Posts /> } />
                                <Route path="post">
                                        <Route index element={ <AddPostForm /> } />
                                        <Route path=":postId" element={ <SinglePost /> } />
                                        <Route path="edit/:postId" element={ <EditPostForm /> } />
                                </Route>
                                <Route path="user">
                                        <Route index element={ <UsersList /> } />
                                        <Route path=":userId" element={ <UserPage /> } />
                                </Route>
                                {/* Catch other routes, replace the bad request */ }
                                <Route path="*" element={ <Navigate to="/" replace /> } />
                        </Route>
                </Routes>
        );
}

export default App;
