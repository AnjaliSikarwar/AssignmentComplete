const Validation = async (values) => {
    const errors = {};
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!values.name) {
        errors.name = "Username is required!";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "This is not a valid email format";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
        errors.password = "Password can't exceed more than 10 characters";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Re-enter is required";
    } else if (values.confirmPassword.length < 4) {
        errors.confirmPassword = "Password must be more than 4 characters";
    } else if (values.confirmPassword.length > 10) {
        errors.confirmPassword = "Password can't exceed more than 10 characters";
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password and confirm password do not match";
    } else {
        console.log("User registered ")
    }
    return errors;
};

export default Validation;
