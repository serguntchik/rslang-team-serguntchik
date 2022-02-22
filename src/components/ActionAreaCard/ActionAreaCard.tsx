import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export interface TeamCard {
    image: string;
    about: string;
    name: string;
    git: string;
}

export const ActionAreaCard: React.FC<TeamCard> = (props: TeamCard) => {
    const {
        image, about, name, git,
    } = props;
    return (
        <Card sx={{ maxWidth: 250 }}>
            <CardMedia component="img" height="250" image={image} alt="photo" />
            <CardContent>
                <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="text" href={git} target="_blank" sx={{ my: 2 }} startIcon={<GitHubIcon />}>
                        {name}
                    </Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {about}
                </Typography>
            </CardContent>
        </Card>
    );
};
