document.querySelector(".thumbs-up").onmouseenter = (event) => {
	event.target.classList.toggle("bi-hand-thumbs-up");
	event.target.classList.toggle("bi-hand-thumbs-up-fill");
};
document.querySelector(".thumbs-down").onmouseenter = (event) => {
	event.target.classList.toggle("bi-hand-thumbs-down");
	event.target.classList.toggle("bi-hand-thumbs-down-fill");
};
document.querySelector(".thumbs-down").onmouseleave = (event) => {
	event.target.classList.toggle("bi-hand-thumbs-down-fill");
	event.target.classList.toggle("bi-hand-thumbs-down");
};
document.querySelector(".thumbs-up").onmouseleave = (event) => {
	event.target.classList.toggle("bi-hand-thumbs-up-fill");
	event.target.classList.toggle("bi-hand-thumbs-up");
};