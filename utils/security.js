//modulis skirtas slaptazdziu validavimui, kurimui, uzkodavimui
const crypto = require("crypto"); //nodejs modulis (nereikia instaliuoti)

//Hash password - uzkoduos duota slaptazodi kartu su salt laukeliu
//Salt - papildomas prierasas prie slaptazodzio kuris yra prijumgiamas ir kartu uzkoduojamas , ir kartu laikomas db. Atskirai kiekvienam vartotojuo sugenreujams slatasisi raktas su kuriuo galima dekodupti slaptazodi.
function hashPassword(password, salt) {  //paduodamas neuzkoduotas slaptazodis
	const hash = crypto.createHmac("sha256", salt); // sha256 - nusakomas stringo ilgis is kurio gali susideti slaptazpdis. banana - salt
	hash.update(password); //prie hash prideti slaptazpdi
	return hash.digest("hex"); //is hash istraukti hex reiksme
}

//Salt - papildomas prierašas prie slaptažodžio;
function generateSalt() {  //sugeneruoja random hex bitus kurie naudojami kartu encodinant slaptazdi 
	return crypto.randomBytes(16).toString("hex"); //16-simboliu
}

 //playginti ar pateiktas slaptazodis atitinka uzhašuota (hash) slaptazpdi
function isValidCredentials(providedPassword, salt, hashPassword) { //providedPassword- is vartotojo, salt- is db, haspassword- is db.
	return hashPassword(providedPassword, salt) === hashPassword; //tikrinama ar prisijungimo duomenys tinka. " === hashPassword" - slaptazpdis kuris issaugotas duomenu bazeje
}

module.exports = {
	hashPassword,
	generateSalt,
	isValidCredentials,
};