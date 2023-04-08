const validateEmail = (value) => {
    if (typeof (value) !== "string"){
        if(!value)
            return true
    }
    else
    {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (validRegex.test(value))
            return true
        else
            return false
    }
}

export default validateEmail