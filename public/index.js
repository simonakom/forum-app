const header = document.querySelector(".nav");

window.addEventListener("scroll", function () {
	if (window.scrollY > 100) {
		header.style.backgroundColor = "#131116";
	} else {
		header.style.backgroundColor = "#131116";
	}
});


function destroyEvent (event) { //paspaudus ant error logine -> isnyksta
	event.target.remove();
}
