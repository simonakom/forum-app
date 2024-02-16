const express = require("express");
const router = express.Router(); 
const UserModel = require("../models/user")
const upload = require("../config/multer.js").upload;
const security = require("../utils/security");
const validate = require("../utils/validation/userValidation.js");

//----------------------------------------------------------------register----------------------------------------------------------------------------//
router.post ("/register", upload.single("img"), async (req, res) => {  
    try { 
    const {username, password, birthDate, email, } = req.body; 
    const fileName = require ("../config/multer.js").lastFileName; 

    if (!username || !email || !password || !birthDate) {
       return res.redirect("/register?error=Please, fill all fields !")
    }

    const validationResult = validate(req.body)
    if (validationResult !== "Successfully registered!") { 
        return res.redirect("/register?error=" + validationResult);
    }

         const existingUsername = await UserModel.findOne({ username });
         if (existingUsername) { 
             return res.redirect("/register?error=Username already exists!");
         }

         const existingEmail = await UserModel.findOne({ email });
         if (existingEmail) {
             return res.redirect("/register?error=Email already exists!");
         }

    const salt = security.generateSalt(); 
    const hashedPassword = security.hashPassword(password, salt);

    const newUserObj = { 
        username, 
        email,
        salt, 
        password: hashedPassword, 
        birthDate,
        profilePicture: `/public/images/${fileName}`,
    }

    const newUser = new UserModel(newUserObj);
    await newUser.save(); 

    req.session.user = { 
        id: newUser._id,
        loggedIn: true,
    };       
    // console.log(newUser);
    res.redirect("/?message=Successfully registered !"); 

    } catch (err) {
        console.log(err);
        res.redirect("/register?error=Unsuccessful registration due to incorrect data!");
    }
});

//----------------------------------------------------------------all users----------------------------------------------------------------------------//
router.get ("/users", async (req, res) => {
    if(!req.session.user?.admin) 
        return res.status(403).json({message: "You are not allowed to"}) 
    console.log(req.session.user);

    const users = await UserModel.find({});
    res.status(200).json (users);
})

//----------------------------------------------------------------log in----------------------------------------------------------------------------//
router.post("/login", async (req, res) => {
    const {loginName, password} = req.body;

    // validation:
    if (!loginName || !password) {
        return res.redirect("/login?error=Please, fill all fields !");
    }

    const existingUser = loginName.includes("@") 
    ? await UserModel.findOne({email:loginName}) 
    : await UserModel.findOne({username: loginName}) 
    if (!existingUser) {
        return res.redirect("/login?error=Invalid username/email !");
    }

    if(
        !security.isValidCredentials( 
            password, 
            existingUser.salt,
            existingUser.password
         )
     ) { 
        return res.redirect("/login?error=Invalid password !");
    } 
    req.session.user = {  
        id: existingUser._id,
        loggedIn: true,
        admin: existingUser.admin, 
    };    

    res.redirect("/"); 
});
 
//----------------------------------------------------------------log out----------------------------------------------------------------------------//
router.get("/logout", async (req, res) => {
    if (!req.session.user.loggedIn) {
        res.redirect("/");
    } else {
        req.session.destroy((err) => { 
            if (err) {
                console.log ("Error deleting session")
                console.log(err);
                return res.redirect("/");
            }
            else {
                console.log("Successfully logged out");
                res.clearCookie ("connect.sid") 
                return res.redirect("/login");
            }
        }); 
    }
});
 
//----------------------------------------------------------------likes----------------------------------------------------------------------------//
router.get("/like/:profileId", async (req, res) => {
	if (!req.session.user?.loggedIn) {
		return res.status(403).json({ message: "Please, log in first!" });
	}

	const user = await UserModel.findOne({ _id: req.params.profileId });
	if (user.profileLikedUsers.includes(req.session.user.id)) {
		return res.status(403).json({ message: "This User was already liked!" });
	}

	if (user.profileDislikedUsers.includes(req.session.user.id)) {
		user.profileDislikedUsers.splice( 
			user.profileDislikedUsers.findIndex( 
				(dislikedUser) => req.session.user.id === dislikedUser
			),
			1
		);
		user.dislikes--;
	}

	console.log(req.session.user.id);
	user.profileLikedUsers.push(req.session.user.id);
	user.likes++;
	await user.save();
	res.status(200).json({ message: "Profile was successfully liked!" });
});

//----------------------------------------------------------------dislikes----------------------------------------------------------------------------//
router.get("/dislike/:profileId", async (req, res) => {
	if (!req.session.user?.loggedIn) {
		return res.status(403).json({ message: "You should log in!" });
	}

	const user = await UserModel.findOne({ _id: req.params.profileId });

	if (user.profileDislikedUsers.includes(req.session.user.id)) {
		return res.status(403).json({ message: "This User was already disliked!" });
	}

	if (user.profileLikedUsers.includes(req.session.user.id)) {
		user.profileLikedUsers.splice(
			user.profileLikedUsers.findIndex(
				(dislikedUser) => req.session.user.id === dislikedUser
			),
			1
		);
		user.likes--;
	}
	user.profileDislikedUsers.push(req.session.user.id);
	user.dislikes++;
	await user.save();
	res.status(200).json({ message: "Profile was successfully disliked!" });
});

//----------------------------------------------------------------check session------------------------------------------------------------------------------//

// router.get("/check-session", async (req, res) => {
// 	res.json({ message: "will implement in future" });
// });

module.exports = router;