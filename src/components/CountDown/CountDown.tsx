import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LinearProgressWithLabel = ({ value, progress }: { value: number; progress: number }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
                {progress}
            </Typography>
        </Box>
    </Box>
);

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
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={normalise(progress)} progress={progress} />
        </Box>
    );
};
