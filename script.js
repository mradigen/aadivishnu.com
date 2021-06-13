var command = document.getElementsByTagName('input')[0];

function resizeInput() {
	this.style.width = this.value.length + 'ch';
}

command.addEventListener('input', resizeInput);
command.addEventListener('keyup', () => {
	if (event.code == "Enter") {
		switch (command.value) {
			case "..":
				history.back();
				break;
			default:
				fetch("pages/" + command.value + ".md")
				.then((response) => {
					if (response.ok) {
						loadPage(command.value);
					} else {
						loadPage("404");
					}
				});
				break;
		}
	}
});

window.onpopstate = (e) => {
	if (e.state != null) {
		loadPage(e.state);
	}
}

window.onload = () => {  
	var urlParams = new URLSearchParams(window.location.search);

	// Check if this is a reload, in which case you are already on a page.
	if (urlParams.has("p")) {
		var pageSrc = urlParams.get("p");
		if (isNaN(pageSrc)) {
			// loadPage(pageSrc.substring(0, pageSrc.length - 1));
			loadPage(pageSrc);
		} else {
			loadPage("Hey!");
		}
	} else {
		loadPage("Hey!");
	}
}

var article = new MarkdownPage(
	document.getElementsByTagName('iframe')[0],
	"pages/index.md",
	"themes/dark.css"
);

article.onload = () => {
	// Replay fadein animation
	article.iframe.contentDocument.body.classList.remove('fadein');
	void article.iframe.contentDocument.body.offsetWidth;
	article.iframe.contentDocument.body.classList.add('fadein');
};

function loadPage(pageSrc) {
	command.value = pageSrc;
	resizeInput.call(command);

	window.history.pushState(pageSrc, null, "?p=" + pageSrc);

	article.src = "pages/" + pageSrc + ".md";
	article.load();
}
