import { Box, Container, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup'

export default function ChangePasswordComponent({...other}) {
    const initValue = () => {
        return {
            oldPassword: '',
            newPassword: '',
            comfirmNewPassword: ''
        }
    }
    const validateRule = () => {
        return Yup.object().shape({
            oldPassword: Yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.'),
            newPassword: Yup.string().required('New password is required').min(8, 'New password is too short - should be 8 chars minimum.'),
            comfirmNewPassword: Yup.string().required('Please enter password').oneOf([Yup.ref('newPassword'), null], 'Password much match'),
        })
    }
    const handleEdit = async (values, { setErrors, setStatus, setSubmitting }) => {

    }

    return (
        <>
        <Box sx={{ padding: 5 }}>
            <Typography sx={{ paddingBottom: 5, textAlign: 'center' }} variant="h3" gutterBottom>Change password</Typography>
            <Formik initialValues={initValue} validationSchema={validateRule} onSubmit={handleEdit}>
                {(errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values) => (
                    <form noValidate onSubmit={handleSubmit} {...other}>
                        <Container fixed >
                            <Grid fullWidth container spacing={3}>
                                <FormControl fullWidth>
                                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                        <Grid item sx={{ textAlign: 'center' }} sm={2}>
                                            <Typography sx={{ fontWeight: 700, color: '#697586' }}>Old Password</Typography>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <OutlinedInput />
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                        </Container>
                    </form>
                )}
            </Formik>
        </Box>
        </>
    )
}
