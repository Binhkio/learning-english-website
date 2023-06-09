import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import api from 'api';
import token from 'utils/token';
import { useNavigate } from 'react-router-dom';
import user from 'utils/user';
import NotificationComponent from 'components/notification';
import { useRef } from 'react';
import handlePayload from 'utils/handle-payload';

const LoginForm = ({ ...others }) => {
    const notiRef = useRef();

    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initValues = () => {
        return {
            email: 'info@codedthemes.com',
            password: '123456',
            submit: null,
        };
    };

    const handleSubmitForm = async (values, { setErrors, setStatus, setSubmitting }) => {
        const params = { email: values.email, password: values.password };

        try {
            const response = await api.authApi.login(params);
            const payload = response.data;
            const handlePayloadData = handlePayload(payload)
            if (handlePayloadData.code === 200 || handlePayloadData.code === 201) {
                token.setSessionStorage(handlePayloadData.data.jsonToken);
                user.setSessionStorage(handlePayloadData.data.user);
                setStatus({ success: true });
                setSubmitting(false);
                navigate('/');
            } else {
                notiRef.current.setState(handlePayloadData.message);
                setStatus({ success: false });
                setErrors({ submit: handlePayloadData.message });
                setSubmitting(false);
            }
        } catch (error) {
            notiRef.current.setState(error.message);
        }
    };

    const validateRule = () => {
        return Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().min(8).max(255).required('Password is required'),
        });
    };

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                spacing={2}>
                <Grid
                    item
                    xs={12}
                    container
                    alignItems="center"
                    justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initValues}
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
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
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
                                    id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
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
                                    id="standard-weight-helper-text-password-login">
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
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                        <NotificationComponent ref={notiRef} />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
