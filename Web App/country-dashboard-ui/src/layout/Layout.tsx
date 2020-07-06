import React from 'react';
import './Layout.css';
import Header from '../components/header/Header';
import Dashboard from '../pages/dashboard/Dashboard';

const Layout = () => {

    return (
        <>
            <Header />
            <Dashboard />
        </>
    );
};

export default Layout;