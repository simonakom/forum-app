const thumbsUpList = document.querySelectorAll(".thumbs-up"),
	thumbsDownList = document.querySelectorAll(".thumbs-down");
thumbsUpList.forEach((element) => {
	element.onmouseenter = (event) => {
		event.target.classList.toggle("bi-hand-thumbs-up");
		event.target.classList.toggle("bi-hand-thumbs-up-fill");
	};
	element.onmouseleave = (event) => {
		event.target.classList.toggle("bi-hand-thumbs-up-fill");
		event.target.classList.toggle("bi-hand-thumbs-up");
	};
});
thumbsDownList.forEach((element) => {
	element.onmouseenter = (event) => {
		event.target.classList.toggle("bi-hand-thumbs-down");
		event.target.classList.toggle("bi-hand-thumbs-down-fill");
	};
	element.onmouseleave = (event) => {
		event.target.classList.toggle("bi-hand-thumbs-down-fill");
		event.target.classList.toggle("bi-hand-thumbs-down");
	};
});

const profileThumbsUp = document.querySelector(".thumbs-up.profile-likes"),
	profileThumbsDown = document.querySelector(".thumbs-down.profile-dislikes");
profileThumbsUp.onclick = async () => {
	const promise = await fetch(`/api/user/like/${id}`);
	const response = await promise.json();
	console.log(response);
};
profileThumbsDown.onclick = async () => {
	const promise = await fetch(`/api/user/dislike/${id}`);
	const response = await promise.json();
	console.log(response);
};