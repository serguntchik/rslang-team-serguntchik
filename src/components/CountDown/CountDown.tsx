import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import './CountDown.css';

export const CountDown = ({
    countdownTime,
    countdownFinished,
}: {
    countdownTime: number;
    countdownFinished: () => void;
}) => {
    const [progress, setProgress] = React.useState(countdownTime);
    const normalise = (value: number) => (value * 100) / countdownTime;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 1) {
                    countdownFinished();
                    return prevProgress;
                }
                return prevProgress - 1;
            });
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="countdown-wrapper">
            <CircularProgress variant="determinate" value={normalise(progress)} />
            <Typography className="countdown-wrapper__value" variant="body2" color="text.secondary">
                {progress}
            </Typography>
        </div>
    );
};
