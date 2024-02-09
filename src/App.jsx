import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx';
import Home from './pages/home/Home.jsx';
import About from './pages/about/About.jsx';
import './scss/main.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="layout">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </div>
            <link rel="icon" type="image/svg+xml" href="/icon.svg" id="favicon" />
        </Router>
    );
}

export default App;
