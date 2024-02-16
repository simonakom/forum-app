
function validate(post) {
	const titleValidation = validateTitle(post.title);
	if (!titleValidation.isValid) return titleValidation.message;
    const contentValidation = validateContent(post.content);
    if (!contentValidation.isValid) return contentValidation.message;
    
	return "Successfully registered!";
}

function validateTitle(title) {
    // const titleRegex = /^[a-zA-Z0-9]+$/;

    if (title.length < 6) {
        return {
            isValid: false,
            message: "Post title must be longer than 5 characters",
        };
    } else if (title.length > 150) {
        return {
            isValid: false,
            message: "Post title must be shorter than 70 characters",
        };
    } 
    // else if (!titleRegex.test(title)) {
    //     return {
    //         isValid: false,
    //         message: "Post title must only contain letters and numbers",
    //     };
    // }
    return { isValid: true, message: "Success" };
}

function validateContent(content) {
    if (content.length < 10) {
        return {
            isValid: false,
            message: "Content must be longer than 10 characters",
        };
    } 
    return { isValid: true, message: "Success" };
}

module.exports = validate;