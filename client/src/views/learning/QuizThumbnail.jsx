import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Stack } from '@mui/system';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Typography } from '@mui/material';
import { BookmarkAdded, BookmarkBorder, DensityMediumOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import api from 'api';
import user from 'utils/user';
import { forwardRef } from 'react';
import NotificationComponent from 'components/notification';
import { useRef } from 'react';
import handlePayload from 'utils/handle-payload';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f6f6f6',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const Transition = forwardRef(function Transition(props, ref) {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
        />
    );
});

export function QuizThumbnail({ quiz }) {
    const notiRef = useRef();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [marked, setMarked] = useState(user.getSessionStorage().quizzes.findIndex((id) => id === quiz._id) > -1);

    const [userData, setUserData] = useState(user.getSessionStorage);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleResetProcess = async () => {
        const userData = user.getSessionStorage();
        const param = {
            _id: userData._id,
            data: {
                lessons: [],
            },
        };

        try {
            const response = await api.adminApi.editUserData(param);
            const payload = handlePayload(response.data);
            setOpen(false);
            notiRef.current.setState(payload.data.message);
            reloeadCurrentUser();
        } catch (error) {
            setOpen(false);
            console.log(error);
        }
    };

    const reloeadCurrentUser = async () => {
        await api.userApi.getCurrentUser({ _id: userData._id }).then((response) => {
            const payload = response.data.data;
            user.setSessionStorage(payload.user);
        });
    };

    if (_.isNil(quiz)) return <></>;

    const handleBookmark = async () => {
        const userData = user.getSessionStorage();
        const payload = {
            _id: userData._id,
            ids: marked ? userData.quizzes.filter((q) => q !== quiz._id) : [...userData.quizzes, quiz._id],
        };
        try {
            const response = await api.userApi.bookmarkQuiz(payload);
            const resData = handlePayload(response.data);
            user.setSessionStorage(resData.data);
        } catch (error) {
            console.log(error);
        }
        setMarked(!marked);
        let notiText = ''
        !marked ? notiText = 'Bookmark Success' : notiText = 'Unbookmark Success'
        notiRef.current.setState(notiText)
    };

    const handleViewQuiz = () => {
        if (_.isNil(quiz._id)) return;
        navigate(`/quiz/?id=${quiz._id}`, { state: { id: quiz._id } });
    };

    return (
        <>
            <Item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Stack
                    spacing={1}
                    padding={1}
                    onClick={handleViewQuiz}
                    width="100%"
                    sx={{ cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>{quiz?.lessons ? quiz.lessons.length : '?'} questions</span>
                        <Divider orientation="vertical" />
                        <span>Creator: {quiz?.creator ? quiz.creator.name : 'Unknown'}</span>
                    </Box>
                    <Typography variant="h4">{quiz?.name ? quiz.name : 'Unknown quiz'}</Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    gap={1}
                    padding={1}>
                    <IconButton onClick={handleBookmark}>{marked ? <BookmarkAdded /> : <BookmarkBorder />}</IconButton>
                    <IconButton onClick={handleClickOpen}>
                        <DensityMediumOutlined />
                    </IconButton>
                </Stack>
            </Item>
            <NotificationComponent ref={notiRef} />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{'Reset lesson'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        When you click yes, all progress is reset, are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleResetProcess}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
