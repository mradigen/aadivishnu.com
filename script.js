var tiles = [
  {
    img:
      "https://cdn.buymeacoffee.com/uploads/project_updates/2020/09/a635f7a01d15c7aaac99d40c824bf45f.png",
    name: "nlyt",
    subtitle: "a soothing puzzle game!",
    link: "https://play.google.com/store/apps/details?id=com.adigen.nlyt"
  },
  {
    img: "https://img.itch.zone/aW1nLzU0MDI1ODYuZ2lm/original/TZs0xL.gif",
    name: "NYU",
    subtitle: "a 3D parkour platformer!",
    link: "https://adigen.itch.io/nyu"
  },
  {
    img:
      "https://cdn.glitch.com/677b9107-258f-4bde-a38c-f9dc0a9a2f52%2Fdarklight.png?v=1616320830036",
    name: "DarkLight",
    subtitle: "a 3D puzzle platformer!",
    link: "https://darklight.glitch.me"
  },
  {
    img:
      "https://cdn.glitch.com/2186056a-7444-45fe-a5f4-1c2e34d293ef%2Flytn.png?v=1616400697977",
    name: "lytn",
    subtitle: "a super fun little game!",
    link: "https://lytn.glitch.me"
  },
  {
    img: "https://img.itch.zone/aW1nLzU1ODc2ODYucG5n/347x500/HShPho.png",
    name: "Hire",
    subtitle: "I'm running out of lines!",
    link: "https://hire.glitch.me"
  },
  // {
  //   img: "",
  //   name: "",
  //   subtitle:
  //     "I like making games, music, and sometimes some graphics. I love to tinker with hardware, write code for embedded systems, and create custom modified operating systems.",
  //   link: "#"
  // },
  // {
  //   img: "",
  //   name: "",
  //   subtitle: "I also am a privacy-minded individual and an open-source advocate. Although I like high-level tech stuff like video editing, but my heart still revolves around low-level technical stuff (like linux servers, OS, networking)",
  //   link: "#"
  // }
];

for (var j = 0; j < tiles.length; j++) {
  if (j % 2 == 0) {
    document.body.innerHTML +=
      "<tile><content class='b'><name></name><subtitle></subtitle></content><a target='_blank' rel='noopener noreferrer'><span></span></a></tile>";
  } else {
    document.body.innerHTML +=
      "<tile><content class='t'><name></name><subtitle></subtitle></content><a target='_blank' rel='noopener noreferrer'><span></span></a></tile>";
  }
}

var tilesDOM = document.getElementsByTagName("tile");

var parts = 4;

for (var i = 0; i < tiles.length; i++) {
  tilesDOM[i + 1].style.setProperty(
    "background-image",
    "url(" + tiles[i].img + ")"
  );
  tilesDOM[i + 1].querySelector("name").innerText = tiles[i].name;
  tilesDOM[i + 1].querySelector("subtitle").innerText = tiles[i].subtitle;
  tilesDOM[i + 1].querySelector("a").href = tiles[i].link;
  tilesDOM[i + 1].querySelector("a").style.setProperty("display", "contents");
}

const shift = (w, x) => ((x / w) * 2 - 1) * 5;
var x = 0,
  y = 0;
document.documentElement.addEventListener("mousemove", e => {
  x = -shift(innerWidth / parts, e.layerY);
  y = shift(innerWidth / parts, e.layerX);
});

function update() {
  document.documentElement.style.setProperty("--x", x + "deg");
  document.documentElement.style.setProperty("--y", y + "deg");

  if (innerWidth <= 680) {
    parts = 1;
  } else if (innerWidth <= 960) {
    parts = 2;
  } else if (innerWidth <= 1280) {
    parts = 3;
  } else {
    parts = 4;
  }

  requestAnimationFrame(update);
}

update();
