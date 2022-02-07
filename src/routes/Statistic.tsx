import React from 'react';
import Footer from '../components/Footer';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const Statistic = () => (
    <div>
        <ResponsiveAppBar />
        <div className="statistic">
            <h1>Статистика</h1>
        </div>
        <Footer />
    </div>
);

export default Statistic;
