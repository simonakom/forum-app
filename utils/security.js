const crypto = require("crypto"); 

function hashPassword(password, salt) {  
	const hash = crypto.createHmac("sha256", salt); 
	hash.update(password); 
	return hash.digest("hex"); 
}
function generateSalt() {  
	return crypto.randomBytes(16).toString("hex"); 
}
function isValidCredentials(providedPassword, salt, hashedPassword) { 
	return hashPassword(providedPassword, salt) === hashedPassword; 
}

module.exports = {
	hashPassword,
	generateSalt,
	isValidCredentials,
};