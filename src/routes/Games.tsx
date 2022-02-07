import React from 'react';
import Footer from '../components/Footer';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const Games = () => (
    <div>
        <ResponsiveAppBar />
        <div className="games">
            <h1>Игры</h1>
        </div>
        <Footer />
    </div>
);

export default Games;
