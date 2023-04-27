import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import api from 'api';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { QuizThumbnail } from './QuizThumbnail';

function Learning() {
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        api.quizApi.getAllQuizzes().then((response) => {
            const quizzesData = response.data.data
            setQuizzes(quizzesData.filter(quiz => quiz.status))
        }, (error) => {
            console.log(error);
        })
    }, [])
    console.log(quizzes);
    
    return (
        <MainCard title="Hoc">
            <Stack spacing={2}>
                {!!quizzes ? quizzes.map((quiz, index) => (
                    <QuizThumbnail quiz={quiz} key={index}/>
                )) : (
                    <Typography variant='h3'>
                        No quiz availble
                    </Typography>
                )}
            </Stack>
        </MainCard>
    );
}

export default Learning;
