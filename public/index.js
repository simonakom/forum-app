const header = document.querySelector(".nav");

window.addEventListener("scroll", function () {
	if (window.scrollY > 100) {
		header.style.backgroundColor = "#131116";
	} else {
		header.style.backgroundColor = "#131116";
	}
});

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
