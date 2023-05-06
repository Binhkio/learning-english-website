import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from 'api';
import { useNavigate } from 'react-router-dom';
import token from 'utils/token';
import user from 'utils/user';

const RegisterForm = ({ ...others }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [notificationState, setNotificationState] = useState({
        isLogin: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const { isLogin, vertical, horizontal } = notificationState;

    const handleCloseNotification = () => {
        setNotificationState({ ...notificationState, isLogin: false });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initValues = () => {
        return {
            email: '',
            username: '',
            password: '',
            submit: null,
        };
    };

    const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            const payload = { email: values.email, name: values.username, password: values.password };
            const response = await api.authApi.register(payload)
            const resData = response.data.data;
            token.setSessionStorage(resData.jsonToken);
            user.setSessionStorage(resData.user);
            setStatus({ success: true });
            setSubmitting(false);
            setNotificationState({ ...notificationState, isLogin: true });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error(error);
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
        }
    };

    const validateRule = () => {
        return Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            username: Yup.string().max(255).required('Name is required'),
            password: Yup.string().min(8).max(255).required('Password is required'),
        });
    };

    return (
        <>
            <Formik
                initialValues={initValues()}
                validationSchema={validateRule}
                onSubmit={handleSubmitForm}>
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText
                                    error
                                    id="standard-weight-helper-text-email-register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-username-register">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-register"
                                type="text"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Username"
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText
                                    error
                                    id="standard-weight-helper-text-username-register">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText
                                    error
                                    id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary">
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>

                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={isLogin}
                            onClose={handleCloseNotification}
                            message="Register success"
                            key={vertical + horizontal}
                        />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default RegisterForm;
