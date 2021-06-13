class MarkdownPage {
	constructor(iFrame, src, themeSrc) {
		this.iframe = iFrame;
		this.iframe.scrolling = "no";
		this.iframe.id = "mdp-frame";
		window.addEventListener("resize", () => { this.resize() });

		this.src = src;
		
		// Attach CSS Stylesheet
		this.theme = document.createElement("link");
		this.theme.rel = "stylesheet";
		this.theme.type = "text/css";
		this.theme.href = themeSrc;
		this.iframe.contentDocument.head.appendChild(this.theme);
		this.theme.onload = () => {
			this.resize();
		};
		this.onload = null;
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
								this.iframe.contentDocument.body.innerHTML = htmlParsed;
								
								this.onload();

								// Resize the iframe
								this.resize();
							}
						);
				});
		});
	}
	resize() {
		this.iframe.width = this.iframe.contentWindow.document.body.scrollWidth;
		this.iframe.height = this.iframe.contentWindow.document.body.scrollHeight;

		// A separate function for images
		// cause change page height when loaded.
		var imgsArr = this.iframe.contentDocument.getElementsByTagName('img');
		for (var i = 0; i < imgsArr.length; i++) {
			// Resize when image loads
			imgsArr[i].onload = () => {
				this.iframe.width = this.iframe.contentWindow.document.body.scrollWidth;
				this.iframe.height = this.iframe.contentWindow.document.body.scrollHeight;
			};
		}
	}
};