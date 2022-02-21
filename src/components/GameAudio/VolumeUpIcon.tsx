import { Button } from '@mui/material';
import React, { useLayoutEffect } from 'react';

const VolumeUpIcon: React.FC<{ path: string; width: string }> = ({ path, width }) => {
    const audio = new Audio(path);

    const handlerAudio = () => {
        audio.play();
    };

    useLayoutEffect(
        () => () => {
            audio.pause();
        },
        [],
    );

    return (
        <Button>
            <svg onClick={handlerAudio} className="volume-up-icon" width={width} height="100%" viewBox="0 0 24 24">
                <path
                    d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73
             2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11
             5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                />
            </svg>
        </Button>
    );
};
export default VolumeUpIcon;
