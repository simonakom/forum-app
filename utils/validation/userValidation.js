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




// function validate(user) {
// 	// switch (user) {
// 	// 	case user.username.length < 5:
// 	// 		return "Username must be longer than 5 symbols";
// 	// 	case user.username.length > 70:
// 	// 		return "Username must be shorter than 70 symbols";
// 	// 	default:
// 	// 		return "success";
// 	// }

// 	if (user.username.length < 5) {
// 		return "Username must be at least 5 characters";
// 	} else if (user.username.length > 50) {
// 		return "Username must be up to 50 characters";
// 	}

//    if (user.password.length < 8) {
// 	return "Password must be at least 8 characters";
// 	} else if (user.password.length > 120) {
// 		return "Password must be up to 50 characters";
// 	}

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Regular expression for a simple email validation
// 	if (!emailRegex.test(user.email) || user.email.length < 6) {
// 		return "Email must be at least 5 characters";
// 	} else if (!emailRegex.test(user.email) || user.email.length > 50) {
// 		return "Email must be up to 50 characters";
// 	}

//     return "Successfully registered!";
// }

// module.exports = validate;





