import { ArrowBack, ArrowForward, ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Slide } from '@mui/material';
import { Box, Stack } from '@mui/system';
import api from 'api';
import FlipCard from 'components/FlipCard/FlipCard';
import { forwardRef } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import userUtils from 'utils/user';

const Transition = forwardRef(function Transition(props, ref) {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
        />
    );
});

export function QuizLearning() {
    const naviage = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const quiz_id = location.state?.id || searchParams.get('id');
    const [quiz, setQuiz] = useState(null);
    const [curIndex, setCurIndex] = useState(0);
    // const [userData, setUserData] = useState(userUtils.getSessionStorage);
    const [open, setOpen] = useState(false);

    const previousCard = () => {
        const preIndex = curIndex > 0 ? curIndex - 1 : quiz?.lessons ? quiz.lessons.length - 1 : 0;
        setCurIndex(preIndex);
    };

    const nextCard = () => {
        const nextIndex = quiz?.lessons ? (curIndex < quiz.lessons.length - 1 ? curIndex + 1 : 0) : 0;
        setCurIndex(nextIndex);
    };

    useEffect(() => {
        const getQuizInfo = async () => {
            const payload = { _id: quiz_id };
            await api.quizApi.getQuizInfo(payload).then(
                (response) => {
                    const resData = response.data.data;
                    setQuiz(resData);
                },
                (error) => {
                    console.log(error);
                }
            );
        };

        getQuizInfo();
    }, []);

    const handleCheckProcess = (userData) => {
        const userLessonId = userData.lessons.map((item) => item);
        const lessonData = quiz.lessons.map((item) => item._id);
        let count = 0;
        userLessonId.forEach((element) => {
            if (lessonData.includes(element)) count++;
        });
        if (count === lessonData.length) setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        naviage('/');
    };

    return (
        <MainCard title={quiz && quiz.name}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                }}>
                {quiz?.lessons &&
                    quiz.lessons.map((lesson, index) => (
                        <FlipCard
                            visible={index === curIndex}
                            key={lesson._id}
                            id={lesson._id}
                            meaning={lesson.name}
                            imgUrl={lesson.image}
                            handleCheckProcess={handleCheckProcess}
                        />
                    ))}
                <Stack
                    direction="row"
                    sx={{
                        width: '100%',
                    }}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}>
                    <IconButton
                        sx={{
                            border: `solid 2px ${curIndex === 0 ? '#f0f0f0' : 'black'}`,
                        }}
                        onClick={previousCard}
                        disabled={curIndex === 0}>
                        <ArrowBack sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <span>
                        {curIndex + 1} / {quiz ? quiz.lessons.length : '?'}
                    </span>
                    <IconButton
                        sx={{
                            border: `solid 2px ${!quiz || curIndex === quiz.lessons.length - 1 ? '#f0f0f0' : 'black'}`,
                        }}
                        onClick={nextCard}
                        disabled={!quiz || curIndex === quiz.lessons.length - 1}>
                        <ArrowForward sx={{ fontSize: '20px' }} />
                    </IconButton>
                </Stack>
            </Box>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{'Congratulation'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">You have finish all lesson</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}
