import { TextField } from "@mui/material"
import { forwardRef, useState } from "react"
import validateEmail from "../utils/validation/validateEmail"

const InputCustom = ({ type, label, placeholder }, ref) => {
    const [isValidated, setIsValidated] = useState(true)
    const checkValidate = (e) => {
        if(isValidated !== validateEmail(e.target.value)){
            setIsValidated(!isValidated)
        }
    }
    switch(type){
        case "email":
            return (
                <TextField
                    size="small"
                    label={label||"Email"}
                    variant="outlined"
                    required={true}
                    placeholder={placeholder||"abcde123@gmail.com"}
                    ref={ref}
                    onBlur={checkValidate}
                    onChange={e => ref.current = e.target.value}
                    error={!isValidated}
                    helperText={!isValidated && "Invalid email"}
                />
            )
        case "password":
            return (
                <TextField
                    size="small"
                    label={label||"Password"}
                    variant="outlined"
                    required={true}
                    type="password"
                    ref={ref}
                    onChange={e => ref.current = e.target.value}
                />
            )
        default:
            return (
                <TextField
                    size="small"
                    label={label}
                    variant="outlined"
                    required
                    placeholder={placeholder}
                    ref={ref}
                    onChange={e => ref.current = e.target.value}
                />
            )
    }
}

export default forwardRef(InputCustom)