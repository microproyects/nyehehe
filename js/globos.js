const gameArea = document.getElementById("gameArea");

// Pantalla completa
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Modo oscuro
const darkBtn = document.getElementById("darkModeBtn");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkModeGlobos", document.body.classList.contains("dark"));
});

// Mantener modo oscuro
if(localStorage.getItem("darkModeGlobos") === "true"){
  document.body.classList.add("dark");
}

// Globos
const stickers = [
  "../assets/sticker2.webp",
  "../assets/sticker4.webp",
  "../assets/sticker5.webp"
];

function crearGlobo() {
  const globo = document.createElement("img");
  globo.src = stickers[Math.floor(Math.random() * stickers.length)];
  globo.classList.add("globo");
  globo.style.left = Math.random() * 90 + "%";
  globo.style.bottom = "-100px";
  globo.style.width = 50 + Math.random() * 30 + "px";

  gameArea.appendChild(globo);

  let pos = -100;
  const speed = 1 + Math.random() * 2;
  const interval = setInterval(() => {
    pos += speed;
    globo.style.bottom = pos + "px";

    if(pos > gameArea.offsetHeight + 50){
      globo.remove();
      clearInterval(interval);
    }
  }, 20);

  globo.addEventListener("click", () => {
    lanzarConfetti(globo);
    globo.remove();
    clearInterval(interval);
  });
}

setInterval(crearGlobo, 1000);

// Confetti
function lanzarConfetti(globo) {
  const confettiStickers = ["../assets/sticker5.webp", "../assets/sticker8.webp", "../assets/sticker9.webp"];
  for(let i = 0; i < 10; i++){
    const conf = document.createElement("img");
    conf.src = confettiStickers[Math.floor(Math.random() * confettiStickers.length)];
    conf.classList.add("confetti");
    conf.style.left = parseFloat(globo.style.left) + Math.random()*10 + "%";
    conf.style.top = parseFloat(globo.style.bottom) + 50 + "px";
    conf.style.animationDuration = 1 + Math.random()*2 + "s";
    gameArea.appendChild(conf);
    setTimeout(() => conf.remove(), 2000);
  }
}
