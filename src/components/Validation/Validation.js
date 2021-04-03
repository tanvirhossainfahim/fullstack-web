const Validate = (values) => {
    const re = /\S+@\S+\.\S+/;
    let errors = {};
    if(!values.name){
        errors.name = 'Name is Required';
    }else if(values.name.length < 3){
        errors.name = 'Please write more than 3 character'
    }
    if(!values.email){
        errors.email = 'Email is required';
    }else if(!re.test(values.email)){
        errors.email = 'Please Write A Valid Email Address'
    }
    if(!values.password){
        errors.password = 'Password is Required';
    }else if(values.password.length < 6){
        errors.password = 'Please Write More than 6 character'
    }
    if(!values.password2){
        errors.password2 = 'Confirm Password is Required';
    }else if(values.password2.length < 6){
        errors.password2 = 'Please Write More than 6 character'
    }
    return errors;
    
};

export default Validate;