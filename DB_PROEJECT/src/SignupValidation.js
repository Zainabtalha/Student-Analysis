function Validation(values){
    let error={}
    //const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.std_name === ""){
        error.std_name = "Name should not be empty"
    }
    else{
        error.std_name=""
    }

    if(values.std_id === ""){
        error.std_id = "student ID should not be empty"
    }
    else{
        error.std_id=""
    }

    if(values.password === "")
    {
        error.password= "Password should not be empty"
    }
    // else if(!password_pattern.test(values.password)){
    //     error.password = "Password didn't match"
    // }
    else{
        error.password=""
    }

    return error;

}

export default Validation;