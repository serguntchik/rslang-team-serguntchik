import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export interface TeamCard {
    image: string;
    about: string;
    name: string;
}

export const ActionAreaCard: React.FC<TeamCard> = (props: TeamCard) => {
    const { image, about, name } = props;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia component="img" height="140" image={image} alt="photo" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {about}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
