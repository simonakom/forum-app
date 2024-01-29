const usernameInput = document.querySelector("#username");
const birthDateInput = document.querySelector("#birth-date");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const profilePhoto = document.querySelector("#profile-photo");
const registerButton = document.querySelector(".register-button");

registerButton.onclick = async () => {

    const data = new FormData(); //data: sepcealus objektas skirtas tam tikro formato duomenim issiusti i serveri + photo

    data.append ("username", usernameInput.value);
    data.append ("birthDate", birthDateInput.value);
    data.append ("password", passwordInput.value);
    data.append ("email", emailInput.value);
    data.append ("img", profilePhoto.files[0]); //console.log(profilePhoto.files[0]);

    const promise = await fetch("http://localhost:3000/api/user/register", {
		method: "post",
		body: data
	});

    
    const response = await promise.json();
    console.log(response);
}

