const Validation = async (values) => {
    const error = {};
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!values.name) {
        error.name = "Username is required!";
    }

    if (!values.email) {
        error.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
        error.email = "This is not a valid email format";
    }

    if (!values.password) {
        error.password = "Password is required";
    } else if (values.password.length < 4) {
        error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
        error.password = "Password can't exceed more than 10 characters";
    }

    if (!values.confirmPassword) {
        error.confirmPassword = "Re-enter is required";
    } else if (values.confirmPassword.length < 4) {
        error.confirmPassword = "Password must be more than 4 characters";
    } else if (values.confirmPassword.length > 10) {
        error.confirmPassword = "Password can't exceed more than 10 characters";
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = "Password and confirm password do not match";
    } else {
        console.log("User registered ")
    }
    return error;
};

export default Validation;