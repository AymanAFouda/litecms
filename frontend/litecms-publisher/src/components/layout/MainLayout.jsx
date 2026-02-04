import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useState } from 'react';

export function MainLayout() {
    const [isMenuExpanded , setIsMenuExpanded] = useState(true);

    return (
        <div id='body-div' className={isMenuExpanded ? "nav-md" : "nav-sm"}>
            <div className='container body'>
                <Sidebar isMenuExpanded={isMenuExpanded} />
                <Header setIsMenuExpanded={setIsMenuExpanded} />
                <Outlet /> 
            </div>
        </div>
    )
}