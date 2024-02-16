function validate(user) {
	const usernameValidation = validateUsername(user.username);
	if (!usernameValidation.isValid) return usernameValidation.message;
	const passwordValidation = validatePassword(user.password);
    if (!passwordValidation.isValid) return passwordValidation.message;
	const emailValidation = validateEmail(user.email);
    if (!emailValidation.isValid) return emailValidation.message;

	return "Successfully registered!";
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (username.length < 5) {
        return {
            isValid: false,
            message: "Username must be longer than 5 characters",
        };
    } else if (username.length > 70) {
        return {
            isValid: false,
            message: "Username must be shorter than 70 characters",
        };
    } else if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: "Username must only contain letters and numbers",
        };
    }
    return { isValid: true, message: "Success" };
}

function validatePassword(password) {
    if (password.length < 8) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters",
        };
    } else if (password.length > 50) {
        return {
            isValid: false,
            message: "Password must be up to 50 characters",
        };
    } else if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain at least one uppercase letter",
        };
    } else if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain at least one lowercase letter",
        };
    } else if (!/\d/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain at least one number",
        };
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return {
            isValid: false,
            message: "Password must contain at least one symbol",
        };
    }
    return { isValid: true, message: "Successfully registered!" };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length < 6) {
        return {
            isValid: false,
            message: "Email must be at least 6 characters and in a valid format",
        };
    } else if (email.length > 50) {
        return {
            isValid: false,
            message: "Email must be shorter than 50 characters",
        };
    }
    return { isValid: true, message: "Success" };
}
module.exports = validate;









