class MarkdownPage {
	constructor(element, src, themeSrc) {
		this.element = element;
		this.src = src;
	}
	async load(theme) {
		fetch(this.src)
			.then((response) => {
				response.text()
					.then((text) => {
						marked(
							text,
							(idk, htmlParsed) => {
								// Load stylesheet as soon as MD is parsed
								// this.iframe.contentDocument.head.appendChild(this.theme);
								// this.iframe.contentDocument.body.innerHTML = htmlParsed;
								document.querySelector('#content').innerHTML = htmlParsed;
								
								this.onload();

								// Resize the iframe
								this.resize();
							}
						);
				});
		});
	}
};