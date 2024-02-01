
function validate(user) {
	// switch (user) {
	// 	case user.username.length < 5:
	// 		return "Username must be longer than 5 symbols";
	// 	case user.username.length > 70:
	// 		return "Username must be shorter than 70 symbols";
	// 	default:
	// 		return "success";
	// }

	if (user.username.length < 5) {
		return "Username must be at least 5 characters";
	} else if (user.username.length > 50) {
		return "Username must be up to 50 characters";
	}

    // if (user.password.length < 5 || user.password.length > 120) {
    //     return "Password must be between 5 and 120 characters";
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Regular expression for a simple email validation
    if (!emailRegex.test(user.email) || user.email.length < 5 || user.email.length > 50) {
        return "Invalid email format or length (must be between 5 and 50 characters)";
    }

    return "Successfully registered!";
}

module.exports = validate;