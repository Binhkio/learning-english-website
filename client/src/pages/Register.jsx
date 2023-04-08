import { Box, Button, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import validateEmail from '../utils/validation/validateEmail'
import InputCustom from '../components/InputCustom'
import axios from 'axios'

const Register = () => {
    const [formValidate, setFormValidate] = useState(true)

    let refEmail = useRef()
    let refName = useRef()
    let refPassword = useRef()

    const handleRegister = async () => {
        const checkValidate = validateEmail(refEmail.current)
        if(formValidate !== checkValidate){
            setFormValidate(!formValidate)
        }
        if(checkValidate === true){
            const formData = {
                email: refEmail.current,
                name: refName.current,
                password: refPassword.current
            }
            console.log("Clicked Sign Up button", formData)
            
            axios.post("???", formData).then(
                (response) => {

                },
                (error) => {
                    console.log("[POST] register form data", error)
                }
            )
        }
    }

    return (
        <Box
            display="grid"
            alignItems="center"
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
                <InputCustom type="email" ref={refEmail}/>
                <InputCustom ref={refName} label="Name" placeholder="Nguyen Van A"/>
                <InputCustom type="password" ref={refPassword}/>
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