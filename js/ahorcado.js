const palabras = [
  "amor", "girasoles", "naranjosa", "teamo",
  "abrazo", "besito", "genesis", "cielo", "corazon", "dormilon", "pollo", "vale","gruñon","ironman","Dormilona", "muah"
];

let palabraSecreta = "";
let palabraMostrada = [];
let intentos = 12;

const palabraDiv = document.getElementById("palabra");
const intentosDiv = document.getElementById("intentos");
const mensajeDiv = document.getElementById("mensaje");
const letrasDiv = document.getElementById("letras");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// --- INICIO ---
function iniciarJuego() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  palabraMostrada = Array(palabraSecreta.length).fill("_");
  intentos = 12;
  mensajeDiv.textContent = "";
  intentosDiv.textContent = "Intentos: " + intentos;
  palabraDiv.textContent = palabraMostrada.join(" ");
  generarBotones();
  limpiarCanvas();
  dibujarCorazon();
}

function generarBotones() {
  letrasDiv.innerHTML = "";
  const abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  abecedario.forEach(letra => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.onclick = () => adivinar(letra.toLowerCase(), btn);
    letrasDiv.appendChild(btn);
  });
}

function adivinar(letra, btn) {
  btn.disabled = true;
  if (palabraSecreta.includes(letra)) {
    palabraSecreta.split("").forEach((l, i) => {
      if (l === letra) palabraMostrada[i] = letra;
    });
    palabraDiv.textContent = palabraMostrada.join(" ");
    if (!palabraMostrada.includes("_")) {
      mensajeDiv.textContent = "Ganaste mi amor dale a reiniciar para jugar con otra palabra";
      lanzarConfetti();
      desactivarBotones();
    }
  } else {
    intentos--;
    btn.classList.add("error");
    intentosDiv.textContent = "Intentos: " + intentos;
    dibujarCorazonRoto();
    if (intentos === 0) {
      mensajeDiv.textContent = " Perdiste amor:c la palabra era: " + palabraSecreta+ " para jugar con otra palabra dale a reiniciar";
      desactivarBotones();
    }
  }
}

// --- DIBUJOS ---
function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarCorazon() {
  limpiarCanvas();
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();
  ctx.moveTo(110, 70);
  ctx.bezierCurveTo(110, 40, 70, 40, 70, 70);
  ctx.bezierCurveTo(70, 90, 110, 110, 110, 130);
  ctx.bezierCurveTo(110, 110, 150, 90, 150, 70);
  ctx.bezierCurveTo(150, 40, 110, 40, 110, 70);
  ctx.fill();
}

function dibujarCorazonRoto() {
  limpiarCanvas();
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();
  ctx.moveTo(110, 70);
  ctx.bezierCurveTo(110, 40, 70, 40, 70, 70);
  ctx.bezierCurveTo(70, 90, 110, 110, 110, 130);
  ctx.lineTo(90, 100);
  ctx.lineTo(120, 120);
  ctx.lineTo(110, 90);
  ctx.lineTo(130, 110);
  ctx.bezierCurveTo(110, 110, 150, 90, 150, 70);
  ctx.bezierCurveTo(150, 40, 110, 40, 110, 70);
  ctx.fill();
}

// --- CONFETTI ---
function lanzarConfetti() {
  const stickers = ["../assets/sticker3.webp", "../assets/sticker4.webp", "../assets/sticker8.webp", "../assets/sticker9.webp", "../assets/sticker5.webp"];
  for (let i = 0; i < 40; i++) {
    const conf = document.createElement("img");
    conf.classList.add("confetti");
    conf.src = stickers[Math.floor(Math.random() * stickers.length)];

    // Posición horizontal más separada
    conf.style.left = 5 + Math.random() * 90 + "%"; // 5% a 95% del ancho

    // Posición vertical más alta
    conf.style.top = -50 - Math.random() * 50 + "px"; // entre -50px y -100px

    // Duración y rotación aleatoria
    conf.style.animationDuration = 2 + Math.random() * 2 + "s";

    document.querySelector(".ahorcado-contenedor").appendChild(conf);

    // Remover después de 4s
    setTimeout(() => conf.remove(), 10000);
  }
}


// --- CONTROL ---
function desactivarBotones() {
  const botones = letrasDiv.querySelectorAll("button");
  botones.forEach(b => b.disabled = true);
}

function reiniciar() {
  iniciarJuego();
}

// --- BOTONES EXTRAS ---
document.getElementById("backBtn").onclick = () => window.location.href = "juegos.html";

document.getElementById("fullscreenBtn").onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// Modo oscuro con localStorage
const darkBtn = document.getElementById("darkModeBtn");
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkBtn.textContent = "☀️ Modo claro";
}

darkBtn.onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", dark);
  darkBtn.textContent = dark ? "☀️ Modo claro" : "🌙 Modo oscuro";
};

iniciarJuego();
