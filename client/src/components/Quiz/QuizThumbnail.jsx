import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Stack } from '@mui/system';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
    Slide,
    Snackbar,
    Typography,
} from '@mui/material';
import { BookmarkAdded, BookmarkBorder, DensityMediumOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import _ from 'lodash';
import api from 'api';
import user from 'utils/user';
import { forwardRef } from 'react';
import token from 'utils/token';

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

export default function QuizThumbnail({ quiz }) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [notificationState, setNotificationState] = useState({
        isReloead: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [marked, setMarked] = useState(user.getSessionStorage().quizzes.findIndex((id) => id === quiz._id) > -1);

    const { isReloead, vertical, horizontal } = notificationState;

    const handleCloseNotification = () => {
        setNotificationState({ ...notificationState, isReloead: false });
    };

    const [userData, setUserData] = useState(user.getSessionStorage);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleResetProcess = async () => {
        const userData = user.getSessionStorage();
        const payload = {
            _id: userData._id,
            data: {
                lessons: [],
            },
        };

        try {
            await api.adminApi.editUserData(payload)
            setOpen(false);
            setNotificationState({ ...notificationState, isReloead: true });
            setSnackbarMessage('Update success');
            reloeadCurrentUser()
        } catch (error) {
            setOpen(false);
            setNotificationState({ ...notificationState, isReloead: true });
            setSnackbarMessage(error.message);
        }
    };

    const reloeadCurrentUser = async () => {
        try {
            const response = await api.userApi.getCurrentUser({_id: userData._id})
            const payload = response.data.data
            user.setSessionStorage(payload.user);
        } catch (error) {
            console.error(error)
        }
      }

    if (_.isNil(quiz)) return <></>;

    const handleBookmark = async () => {
        const userData = user.getSessionStorage();
        const payload = {
            _id: userData._id,
            ids: marked ? userData.quizzes.filter((q) => q !== quiz._id) : [...userData.quizzes, quiz._id],
        };
        try {
            const response = await api.userApi.bookmarkQuiz(payload)
            const resData = response.data.data;
            user.setSessionStorage(resData);
            setNotificationState({ ...notificationState, isReloead: true });
            setSnackbarMessage('Update success');
            setMarked(!marked);
        } catch (error) {
            console.error(error);
        }
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
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={isReloead}
                onClose={handleCloseNotification}
                message={snackbarMessage}
                key={vertical + horizontal}
            />
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
