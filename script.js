var command = document.getElementsByTagName('input')[0];
var article = document.querySelector('#content');

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
		loadPage(e.state, true);
	}
}

window.onload = () => {  
	var urlParams = new URLSearchParams(window.location.search);

	// Check if this is a reload, in which case you are already on a page.
	if (urlParams.has("p")) {
		var pageSrc = urlParams.get("p").replace(/\/$/, "");
		if (isNaN(pageSrc)) {
			// loadPage(pageSrc.substring(0, pageSrc.length - 1));
			loadPage(pageSrc);
		} else {
			loadPage("home");
		}
	} else {
		loadPage("home");
	}
}

async function loadPage(pageSrc, historyBack = false) {
	command.value = pageSrc;
	resizeInput.call(command);

	if (!historyBack) {
		window.history.pushState(pageSrc, null, "?p=" + pageSrc);
	}

	var res = await fetch("pages/" + pageSrc + ".md")
	marked(await res.text(), (idk, htmlParsed) => content.innerHTML = htmlParsed)

	content.classList.remove('fadein');
	void content.offsetWidth;
	content.classList.add('fadein');

	// Show back button
	if (new URLSearchParams(window.location.search).get('p').replace(/\/$/, "") != 'home') {
		document.querySelector('#back').style.display = 'block';
	} else {
		document.querySelector('#back').style.display = 'none';
	}
}
