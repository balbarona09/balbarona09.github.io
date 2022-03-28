function showMenu() {
	let top_nav = document.getElementById("navbar");
	if (top_nav.classList.contains("responsive")) {
		top_nav.classList.remove("responsive");
	} else {
		top_nav.classList.add("responsive");
	}
}