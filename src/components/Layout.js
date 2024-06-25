import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout=() =>
{
        return (
                <div className="">
                        <Header />
                        <main className="bg-slate-100">
                                {/* Outlet represents all of the children */ }
                                <Outlet />
                        </main>
                </div>
        );
}

export default Layout;
