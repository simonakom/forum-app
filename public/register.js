const usernameInput = document.querySelector("#username");
const birthDateInput = document.querySelector("#birth-date");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const profilePhoto = document.querySelector("#profile-photo");
const registerButton = document.querySelector(".register-button");

document.getElementById('profile-photo').addEventListener('change', handleFileSelect);

function handleFileSelect() {
    const fileInput = document.getElementById('profile-photo');
    const selectedFileContainer = document.getElementById('selected-file-name');
    if (fileInput.files.length > 0) { // Check if a file is selected
        selectedFileContainer.textContent = fileInput.files[0].name;
    } else {
        selectedFileContainer.textContent = 'No file selected';
    }
}