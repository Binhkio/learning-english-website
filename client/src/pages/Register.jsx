import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import validateEmail from '../utils/validation/validateEmail'

const Register = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async () => {
        const formData = {
            email,
            name,
            password
        }
        console.log("Clicked Sign Up button", formData)
    }

    return (
        <Box
            display="grid"
            alignItems="center"
            // justifyContent="center"
            height="100vh"
            width="100vw"
            >
            <Box
                display="grid"
                justifyContent="center"
                component="form"
                gap="10px"
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    textAlign="center"
                >
                    REGISTER
                </Typography>
                <TextField
                    size="small"
                    label="Email"
                    variant="outlined"
                    required
                    placeholder="abcde123@gmail.com"
                    autoFocus
                    error={!validateEmail(email)}
                    helperText={!validateEmail(email) && "Invalid email"}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    size="small"
                    label="Name"
                    variant="outlined"
                    required
                    placeholder="Nguyen Van A"
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    size="small"
                    label="Password"
                    variant="outlined"
                    required
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    variant="outlined"
                    onClick={handleRegister}
                >
                    Sign up
                </Button>

            </Box>
        </Box>
    )
}

export default Register