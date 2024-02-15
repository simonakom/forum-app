const accordion = document.querySelectorAll (".accordion")

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function(){ 
        this.classList.toggle("active") 

        const description = this.nextElementSibling

        if (description.style.maxHeight) {
            description.style.maxHeight = null;
        } else { 
            description.style.maxHeight = description.scrollHeight + "px";
        }
    })
}