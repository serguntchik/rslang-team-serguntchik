import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { ICardProps } from '../../utils/alias';
import { baseUrl, createUserWord } from '../../core/api';
import { Consumer } from '../../core/context';

const myComponent = (text: string) => <span dangerouslySetInnerHTML={{ __html: text }} />;

export const CardItem: React.FC<ICardProps> = ({
    word, isPlaying, play, pause,
}) => (
    <Consumer>
        {(value) => (
            <Card sx={{ maxWidth: 450 }}>
                <CardHeader
                    action={
                        isPlaying ? (
                            <IconButton aria-label="play/pause" onClick={() => play(word)}>
                                <PlayCircleOutlineIcon />
                            </IconButton>
                        ) : (
                            <IconButton aria-label="play/pause" onClick={() => pause()}>
                                <PauseCircleOutlineIcon />
                            </IconButton>
                        )
                    }
                    title={`${word.word} - ${word.transcription}`}
                    subheader={word.wordTranslate}
                />
                <CardMedia component="img" height="194" image={`${baseUrl}/${word.image}`} alt="Paella dish" />
                <CardContent>
                    <Typography variant="body2">{myComponent(word.textMeaning)}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {word.textMeaningTranslate}
                    </Typography>
                    <Typography variant="body2">{myComponent(word.textExample)}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {word.textExampleTranslate}
                    </Typography>
                </CardContent>
                {value ? (
                    <IconButton aria-label="add to favorites" onClick={() => createUserWord(word)}>
                        <BookmarkAddIcon />
                    </IconButton>
                ) : null}
            </Card>
        )}
    </Consumer>
);
