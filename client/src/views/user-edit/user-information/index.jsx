import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import userUtils from 'utils/user';
import { useTheme } from '@emotion/react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormHelperText, OutlinedInput, Snackbar } from '@mui/material';
import api from 'api';
import { useNavigate } from 'react-router';
import token from 'utils/token';
import user from 'utils/user';
import NotificationComponent from 'components/notification';
import handlePayload from 'utils/handle-payload';

const CUSTOME_TEXT = {
    EDIT: 'Edit',
    SAVE: 'Save',
};

export default function UserInformationForm({ ...other }) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState(userUtils.getSessionStorage);
    const { name, email } = userData;
    const initValues = () => {
        return {
            name: name,
            email: email,
        };
    };
    const validateRule = () => {
        return Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        });
    };

    const [notificationState, setNotificationState] = useState({
        isReloead: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const { isReloead, vertical, horizontal } = notificationState;

    const handleCloseNotification = () => {
        setNotificationState({ ...notificationState, isReloead: false });
    };

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [userState, setUserState] = useState({
        nameDisable: true,
        emailDisable: true,
        editText: CUSTOME_TEXT.EDIT,
        isEdit: false,
    });
    const { nameDisable, emailDisable, editText, isEdit } = userState;

    const theme = useTheme();

    const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting }) => {
        const payload = {
            _id: userData._id,
            data: {
                name: values.name,
            },
        };

        try {
            const response = await api.adminApi.editUserData(payload);
            const responseData = handlePayload(response.data);
            setSnackbarMessage(responseData.message);
            setNotificationState({ ...notificationState, isReloead: true });
            reloeadCurrentUser();
            setStatus({ success: true });
            setSubmitting(false);
            navigate(window.location.pathname);
        } catch (error) {
            setSnackbarMessage(error.message);
            setNotificationState({ ...notificationState, isReloead: true });
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
        }
    };

    const reloeadCurrentUser = async () => {
        await api.userApi.getCurrentUser({ _id: userData._id }).then((response) => {
            console.log(response);
            const payload = response.data.data;
            token.setSessionStorage(payload.jsonToken);
            user.setSessionStorage(payload.user);
        });
    };

    const setState = (editText) => {
        setUserState((prevState) => ({
            ...prevState,
            nameDisable: !nameDisable,
            editText: editText,
            isEdit: !isEdit,
        }));
    };

    const handleEdit = async (values, { setErrors, setStatus, setSubmitting }) => {
        if (editText === CUSTOME_TEXT.SAVE) {
            await handleSubmitForm(values, { setErrors, setStatus, setSubmitting });
        } else {
            setState(CUSTOME_TEXT.SAVE);
        }
    };

    return (
        <>
            <Box sx={{ padding: 5 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ paddingBottom: 5, textAlign: 'center' }}>
                    User Information
                </Typography>
                <Formik
                    initialValues={initValues()}
                    validationSchema={validateRule}
                    onSubmit={handleEdit}>
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form
                            noValidate
                            onSubmit={handleSubmit}
                            {...other}>
                            <Grid
                                container
                                spacing={3}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.name && errors.name)}
                                    sx={{ ...theme.typography.customInput }}>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ alignItems: 'center' }}>
                                        <Grid
                                            item
                                            sx={{ textAlign: 'center' }}
                                            sm={2}>
                                            <Typography sx={{ fontWeight: 700, color: '#697586' }}>Name</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            sx={12}
                                            sm={10}>
                                            <OutlinedInput
                                                id="outlined-adornment-name-login"
                                                name="name"
                                                size="small"
                                                autoComplete="off"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.name}
                                                disabled={nameDisable}
                                                label="Name Address"
                                                inputProps={{}}
                                                sx={{
                                                    width: '100%',
                                                }}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login">
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                </FormControl>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.email && errors.email)}
                                    sx={{ ...theme.typography.customInput }}>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ alignItems: 'center' }}>
                                        <Grid
                                            item
                                            sx={{ textAlign: 'center' }}
                                            sm={2}>
                                            <Typography sx={{ fontWeight: 700, color: '#697586' }}>Email</Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            sx={12}
                                            sm={10}>
                                            <OutlinedInput
                                                id="outlined-adornment-email-login"
                                                name="email"
                                                size="small"
                                                autoComplete="off"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                value={values.email}
                                                disabled={emailDisable}
                                                label="Email Address"
                                                inputProps={{}}
                                                sx={{
                                                    width: '100%',
                                                }}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>
                                </FormControl>
                                <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ p: 1 }}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                sx={{ maxWidth: '120px' }}
                                                disabled={isSubmitting}>
                                                {editText}
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                    {isEdit && (
                                        <Box sx={{ p: 1 }}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                    sx={{ maxWidth: '120px' }}
                                                    onClick={() => setState(CUSTOME_TEXT.EDIT)}>
                                                    Cancel
                                                </Button>
                                            </AnimateButton>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        </form>
                    )}
                </Formik>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={isReloead}
                    onClose={handleCloseNotification}
                    message={snackbarMessage}
                    key={vertical + horizontal}
                />
            </Box>
        </>
    );
}
