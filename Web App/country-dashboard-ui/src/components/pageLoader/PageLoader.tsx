import React from 'react';
import { Spinner } from 'react-bootstrap';
import './PageLoader.css';

const PageLoader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center spinner">
            <Spinner animation="border" role="status" className="spinner">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
}

export default React.memo(PageLoader);