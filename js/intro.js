// Flores cayendo (emoji)
const flores = ["🌸","🌷","🌺","💐","🌹","Te amo", "Chiquitita"];
const contenedor = document.getElementById("flores");
function crearFlor(){
  const flor = document.createElement("div");
  flor.className = "flower";
  flor.textContent = flores[Math.floor(Math.random()*flores.length)];
  flor.style.left = Math.random()*100 + "vw";
  flor.style.animationDuration = (3 + Math.random()*2) + "s";
  contenedor.appendChild(flor);
  setTimeout(()=> flor.remove(), 12200);
}
const lluvia = setInterval(crearFlor, 300);

// Mostrar ramo (animación desde abajo) a los 4s
setTimeout(()=>{
  document.getElementById("ramo").classList.add("show");
}, 4000);

// Pasar al contenido principal a los 8s
setTimeout(()=>{
  clearInterval(lluvia);
  document.getElementById("intro").style.display = "none";
  const main = document.getElementById("main");
  if(main) main.style.display = "block";
}, 8000);
