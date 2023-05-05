import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
const { Snackbar } = require('@mui/material');
const { useState } = require('react');

const NotificationComponent = forwardRef((props, ref) => {
    const [notificationState, setNotificationState] = useState({
        isLogin: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { isLogin, vertical, horizontal } = notificationState;

    const handleCloseNotification = () => {
        setNotificationState({ ...notificationState, isLogin: false });
    };

    useImperativeHandle(ref, () => ({
        setState(message) {
            setSnackbarMessage(message)
            setNotificationState({ ...notificationState, isLogin: true });
        },
    }));

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={isLogin}
            onClose={handleCloseNotification}
            message={snackbarMessage}
            key={vertical + horizontal}
        />
    );
});

export default NotificationComponent;
