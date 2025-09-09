const fullscreenBtn = document.getElementById("fullscreenBtn");
const darkBtn = document.getElementById("darkModeBtn");

// Pantalla completa
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Modo oscuro
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkModeGaleria", document.body.classList.contains("dark"));
});

// Mantener modo oscuro
if(localStorage.getItem("darkModeGaleria") === "true"){
  document.body.classList.add("dark");
}

// Abrir imagen en grande al hacer click
const grid = document.getElementById("gridGaleria");
grid.addEventListener("click", e => {
  if(e.target.tagName === "IMG"){
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = 1000;

    const img = document.createElement("img");
    img.src = e.target.src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "15px";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
  }
});
