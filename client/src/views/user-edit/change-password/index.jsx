import { useTheme } from '@emotion/react';
import { Box, Button, Container, FormControl, FormHelperText, Grid, OutlinedInput, Snackbar, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import api from 'api';
import userUtils from 'utils/user';
import { useNavigate } from 'react-router';

export default function ChangePasswordComponent({ ...other }) {
    const theme = useTheme();
    const navigate = useNavigate();

    const [userData, setUserData] = useState(userUtils.getSessionStorage);

    const initValues = () => {
        return {
            oldPassword: '',
            newPassword: '',
            comfirmNewPassword: '',
        };
    };
    const validateRule = () => {
        return Yup.object().shape({
            oldPassword: Yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.'),
            newPassword: Yup.string().required('New password is required').min(8, 'New password is too short - should be 8 chars minimum.'),
            comfirmNewPassword: Yup.string()
                .required('Please enter password')
                .oneOf([Yup.ref('newPassword'), null], 'Password much match'),
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
    const handleEdit = async (values, { setErrors, setStatus, setSubmitting }) => {
        const payload = {
            _id: userData._id,
            data: {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            },
        };

        try {
            const response = await api.userApi.changePassword(payload)
            const responseData = response.data.data;
            setSnackbarMessage(responseData.message);
            setNotificationState({ ...notificationState, isReloead: true });
            setStatus({ success: true });
            setSubmitting(false);
            navigate(window.location.pathname);
        } catch (error) {
            console.error(error);            
            setSnackbarMessage(error.message);
            setNotificationState({ ...notificationState, isReloead: true });
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={{ padding: 5 }}>
                <Typography
                    sx={{ paddingBottom: 5, textAlign: 'center' }}
                    variant="h3"
                    gutterBottom>
                    Change password
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
                            <Container fixed>
                                <Grid
                                    fullWidth
                                    container
                                    spacing={3}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                                        sx={{ ...theme.typography.customInput }}>
                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{ alignItems: 'center' }}>
                                            <Grid
                                                item
                                                sx={{ textAlign: 'center' }}
                                                sm={2}>
                                                <Typography sx={{ fontWeight: 700, color: '#697586' }}>Old Password</Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                sm={10}>
                                                <OutlinedInput
                                                    fullWidth
                                                    id="outlined-adornment-oldPassword-login"
                                                    name="oldPassword"
                                                    size="small"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="text"
                                                    value={values.oldPassword}
                                                    label="Input old password"
                                                    inputProps={{}}
                                                />
                                                {touched.oldPassword && errors.oldPassword && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-password">
                                                        {errors.oldPassword}
                                                    </FormHelperText>
                                                )}
                                            </Grid>
                                        </Grid>

                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.newPassword && errors.newPassword)}
                                            sx={{ ...theme.typography.customInput }}>
                                            <Grid
                                                container
                                                spacing={2}
                                                sx={{ alignItems: 'center' }}>
                                                <Grid
                                                    item
                                                    sx={{ textAlign: 'center' }}
                                                    sm={2}>
                                                    <Typography sx={{ fontWeight: 700, color: '#697586' }}>New Password</Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    sm={10}>
                                                    <OutlinedInput
                                                        fullWidth
                                                        id="outlined-adornment-newPassword-login"
                                                        name="newPassword"
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        type="text"
                                                        value={values.newPassword}
                                                        label="Input old password"
                                                        inputProps={{}}
                                                    />
                                                    {touched.newPassword && errors.newPassword && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-password">
                                                            {errors.newPassword}
                                                        </FormHelperText>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </FormControl>

                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.comfirmNewPassword && errors.comfirmNewPassword)}
                                            sx={{ ...theme.typography.customInput }}>
                                            {' '}
                                            <Grid
                                                container
                                                spacing={2}
                                                sx={{ alignItems: 'center' }}>
                                                <Grid
                                                    item
                                                    sx={{ textAlign: 'center' }}
                                                    sm={2}>
                                                    <Typography sx={{ fontWeight: 700, color: '#697586' }}>New Password</Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    sm={10}>
                                                    <OutlinedInput
                                                        fullWidth
                                                        id="outlined-adornment-comfirmNewPassword-login"
                                                        name="comfirmNewPassword"
                                                        size="small"
                                                        autoComplete="off"
                                                        variant="outlined"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        type="text"
                                                        value={values.comfirmNewPassword}
                                                        label="Input old password"
                                                        inputProps={{}}
                                                    />
                                                    {touched.comfirmNewPassword && errors.comfirmNewPassword && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-password">
                                                            {errors.comfirmNewPassword}
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
                                                        Submit
                                                    </Button>
                                                </AnimateButton>
                                            </Box>
                                        </Box>
                                    </FormControl>
                                </Grid>
                            </Container>
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
