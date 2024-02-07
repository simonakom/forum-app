
function validate(comment) {
	const titleValidation = validateContent(comment.content);
	if (!titleValidation.isValid) return titleValidation.message;
    
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