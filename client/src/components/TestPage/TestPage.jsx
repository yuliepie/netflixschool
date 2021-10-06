import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

const TestPage = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </div>
    );
}


export default TestPage;