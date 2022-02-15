import React from 'react';

const ProgressGame: React.FC<{ color: string }> = ({ color }) => (
    <svg className="progress-item" width="15px" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={color}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
);
export default ProgressGame;
