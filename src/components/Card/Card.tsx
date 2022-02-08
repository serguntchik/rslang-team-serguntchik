import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { ICardProps, server } from '../../utils/alias';

const myComponent = (text: string) => <span dangerouslySetInnerHTML={{ __html: text }} />;

export const RecipeReviewCard: React.FC<ICardProps> = ({
    props, isPlaying, setCardFlag, setSoundSrc, cardFlag,
}) => {
    const {
        id,
        word,
        transcription,
        wordTranslate,
        image,
        textMeaning,
        textMeaningTranslate,
        textExample,
        textExampleTranslate,
        audio,
        audioExample,
        audioMeaning,
    } = props;

    let isPlay = isPlaying;
    const { cardId, flag } = cardFlag;
    const sounds = [audio, audioMeaning, audioExample];

    if (id === cardId) {
        isPlay = !flag;
    }

    useEffect(() => {
        if (id === cardId) {
            setCardFlag({ cardId: id, flag: !isPlay });
        }
        return () => {
            setCardFlag({ cardId: id, flag: true });
        };
    }, [isPlay]);

    return (
        <Card sx={{ maxWidth: 450 }}>
            <CardHeader
                action={
                    isPlay ? (
                        <IconButton
                            aria-label="play/pause"
                            onClick={() => {
                                setSoundSrc(sounds);
                                setCardFlag({ cardId: id, flag: isPlay });
                            }}
                        >
                            <PauseCircleOutlineIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            aria-label="play/pause"
                            onClick={() => {
                                setSoundSrc(sounds);
                                setCardFlag({ cardId: id, flag: isPlay });
                            }}
                        >
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    )
                }
                title={`${word} - ${transcription}`}
                subheader={wordTranslate}
            />
            <CardMedia component="img" height="194" image={`${server}/${image}`} alt="Paella dish" />
            <CardContent>
                <Typography variant="body2">{myComponent(textMeaning)}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {textMeaningTranslate}
                </Typography>
                <Typography variant="body2">{myComponent(textExample)}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {textExampleTranslate}
                </Typography>
            </CardContent>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
        </Card>
    );
};
