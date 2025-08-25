const puzzleDiv = document.getElementById("puzzle");
const resultadoDiv = document.getElementById("resultado");
const continuarBtn = document.getElementById("continuar-btn");
const modoBtn = document.getElementById("modo-oscuro-btn");
const regresarBtn = document.getElementById("regresar-btn");
const confetiContainer = document.getElementById("confeti-container");

const puzzles = [
  "../assets/sticker5.webp",
  "../assets/sticker3.webp",
  "../assets/sticker1.png",
  "../assets/sticker8.webp",
  "../assets/sticker4.webp",
  "../assets/sticker2.webp",
    "../assets/sticker6.webp",
    "../assets/sticker7.webp",
    
];

const stickerImgs = [
  "../assets/sticker6.webp",
  "../assets/sticker2.webp",
  "../assets/sticker3.webp",
  "../assets/sticker4.webp",
  "../assets/sticker8.webp"
];

let currentPuzzle = 0;
const tamaño = 9;
let piezas = [];

function cargarPuzzle(src){
  puzzleDiv.innerHTML = "";
  resultadoDiv.textContent = "";
  continuarBtn.style.display = "none";
  piezas = [];

  const img = new Image();
  img.src = src;
  img.onload = () => {
    const w = puzzleDiv.clientWidth / tamaño;
    const h = puzzleDiv.clientHeight / tamaño;

    // Crear piezas
    for(let y=0;y<tamaño;y++){
      for(let x=0;x<tamaño;x++){
        const pieza = document.createElement("div");
        pieza.classList.add("pieza");
        pieza.style.width = `${w}px`;
        pieza.style.height = `${h}px`;
        pieza.style.position = "absolute";
        pieza.style.transition = "all 0.3s ease";
        pieza.style.backgroundImage = `url(${img.src})`;
        pieza.style.backgroundSize = `${tamaño*100}% ${tamaño*100}%`;
        pieza.style.backgroundPosition = `${-x*100}% ${-y*100}%`;
        pieza.dataset.correcto = y*tamaño + x;
        pieza.dataset.pos = y*tamaño + x;
        puzzleDiv.appendChild(pieza);
        piezas.push(pieza);
      }
    }

    // Crear array de posiciones únicas y mezclar
    const posiciones = [];
    for(let y=0;y<tamaño;y++){
      for(let x=0;x<tamaño;x++){
        posiciones.push({x: x*w, y: y*h});
      }
    }
    posiciones.sort(()=>Math.random()-0.5); // shuffle

    // Asignar cada pieza a una posición única
    piezas.forEach((p,i)=>{
      p.style.left = posiciones[i].x + "px";
      p.style.top = posiciones[i].y + "px";
    });

    moverPieza();
  };
}


function moverPieza(){
  let seleccionada = null;
  piezas.forEach(p => {
    p.onclick = ()=>{
      if(!seleccionada){
        seleccionada = p;
        p.style.border = "2px solid #FFC1E3";
      } else if(seleccionada === p){
        p.style.border = "1px solid #ccc";
        seleccionada = null;
      } else {
        // Intercambiar posiciones usando transform
        const tempLeft = p.style.left;
        const tempTop = p.style.top;
        p.style.left = seleccionada.style.left;
        p.style.top = seleccionada.style.top;
        seleccionada.style.left = tempLeft;
        seleccionada.style.top = tempTop;
        seleccionada.style.border = "1px solid #ccc";
        seleccionada = null;
        validarPiezas();
        checkPuzzle();
      }
    };
  });
}

function validarPiezas(){
  const w = puzzleDiv.clientWidth / tamaño;
  const h = puzzleDiv.clientHeight / tamaño;
  piezas.forEach(p=>{
    const posX = Math.round(parseFloat(p.style.left)/w);
    const posY = Math.round(parseFloat(p.style.top)/h);
    const actualPos = posY*tamaño + posX;
    if(parseInt(p.dataset.correcto) === actualPos){
      p.style.border = "2px solid #4CAF50";
    } else {
      p.style.border = "1px solid #ccc";
    }
  });
}

function checkPuzzle(){
  const w = puzzleDiv.clientWidth / tamaño;
  const h = puzzleDiv.clientHeight / tamaño;
  const completo = piezas.every(p=>{
    const posX = Math.round(parseFloat(p.style.left)/w);
    const posY = Math.round(parseFloat(p.style.top)/h);
    const actualPos = posY*tamaño + posX;
    return parseInt(p.dataset.correcto) === actualPos;
  });

  if(completo){
    resultadoDiv.textContent="🎉 ¡Felicidades amorrrr!";
    lanzarConfeti();
    continuarBtn.style.display="inline-block";
  }
}

function lanzarConfeti(){
  for(let i=0;i<25;i++){
    const img = document.createElement("img");
    img.src = stickerImgs[Math.floor(Math.random()*stickerImgs.length)];
    img.classList.add("sticker-confeti");
    img.style.left = Math.random()*puzzleDiv.clientWidth + "px";
    img.style.top = "-50px";
    img.style.width = "40px";
    img.style.height = "40px";
    confetiContainer.appendChild(img);
    setTimeout(()=>{ confetiContainer.removeChild(img); },3000);
  }
}

// Botón continuar
continuarBtn.onclick = ()=>{
  currentPuzzle++;
  if(currentPuzzle < puzzles.length){
    cargarPuzzle(puzzles[currentPuzzle]);
  } else {
    resultadoDiv.textContent = "🎊 ¡Terminaste todos los rompecabezas amorrrr!";
    continuarBtn.style.display="none";
  }
};

// Modo oscuro
modoBtn.onclick = ()=>{
  document.body.classList.toggle("dark");
};

// Botón regresar
regresarBtn.onclick = ()=>{
  window.location.href="../index.html";
};

cargarPuzzle(puzzles[currentPuzzle]);
