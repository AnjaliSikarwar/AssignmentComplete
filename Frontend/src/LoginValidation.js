const Validation = async (values) => {
    const errors = {};
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "This is not a valid email format";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 4 || values.password.length > 10) {
        errors.password = "Password must be between 4 and 10 characters";
    }

    return errors;
}

export default Validation;