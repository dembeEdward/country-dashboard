import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css';

const Header = () => {

    return (
        <Navbar bg="light" expand="lg" className="fixed-top shadow">
            <Navbar.Brand href="/">Country Dashboard</Navbar.Brand>
        </Navbar>
    );
};

export default React.memo(Header);