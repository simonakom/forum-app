function validate(comments) {
	const contentValidation = validateContent(comments.content);
	if (!contentValidation.isValid) return contentValidation.message;
    
	return "Successfully registered!";
}

function validateContent(content) {

    if (content.length < 5) {
        return {
            isValid: false,
            message: "Post content must be longer than 5 characters",
        };
    } else if (content.length > 4000) {
        return {
            isValid: false,
            message: "Post content must be shorter than 4000 characters",
        };
    } 
    return { isValid: true, message: "Success" };
}


module.exports = validate;