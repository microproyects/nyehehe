const preguntas = [
  {
    pregunta:"¿Cuál es mi apodo  favorito?", 
    respuestas:["Naranjoso","Mi amor","Danielito","Toaquiza"], 
    correcta:"Danielito",
    sticker:"🎉",
    img:"../assets/sticker1.png"
  },
  {
    pregunta:"¿Qué Significa el Nivea?", 
    respuestas:["Estar juntos","Besito","Tener hijos","Superar cualquier adversidad"], 
    correcta:"Superar cualquier adversidad",
    sticker:"💖",
    img:"../assets/sticker2.webp"
  },
  {
    pregunta:"¿Qué animal usamos para describirnos?", 
    respuestas:["Gatitos naranjosos","Perros","Pajaritos","Conejitos"], 
    correcta:"Gatitos naranjosos",
    sticker:"🐱",
    img:"../assets/sticker3.webp"
  },
{
    pregunta:"¿Cuando te declaraste?", 
    respuestas:["24 de Abril","10 de Abril","20 de Abril"], 
    correcta:"24 de Abril",
    sticker:"🐱",
    img:"../assets/sticker3.webp"
  },
    {
    pregunta:"¿Que comida nos gusta a los 2?", 
    respuestas:["Cevichocho","Perros","Empanadas","Chifa"], 
    correcta:"Cevichocho",
    sticker:"🐱",
    img:"../assets/sticker4.webp"
  },
{
    pregunta:"¿Mmmmm a donde te fuiste el dia que paso lo de que conexion?", 
    respuestas:["Museo","Discoteca","Casa","Caminar"], 
    correcta:"Museo",
    sticker:"🐱",
    img:"../assets/sticker5.webp"
  },
  {
    pregunta:"¿Mmmmm a donde te fuiste el dia que paso lo de que conexion?", 
    respuestas:["Museo","Discoteca","Casa","Caminar"], 
    correcta:"Museo",
    sticker:"🐱",
    img:"../assets/sticker5.webp"
  },
  {
    pregunta:"¿Que me gusta a mi usar?", 
    respuestas:["Lentes","Pantalones","Gorra","Camisa"], 
    correcta:"Lentes",
    sticker:"🐱",
    img:"../assets/sticker6.webp"
  },
   {
    pregunta:"¿Te enojas si te digo Santamaria?", 
    respuestas:["Si","No"], 
    correcta:"Si",
    sticker:"🐱",
    img:"../assets/sticker7.webp"
  },
  {
    pregunta:"¿Me amas?", 
    respuestas:["Si","No"], 
    correcta:"Si",
    sticker:"🐱",
    img:"../assets/sticker8.webp"
  }
];

let currentPregunta = 0;
let score = 0;

const preguntaTexto = document.getElementById("pregunta-texto");
const respuestasContainer = document.getElementById("respuestas-container");
const resultadoDiv = document.getElementById("resultado");
const confetiContainer = document.getElementById("confeti-container");

function cargarPregunta() {
  if(currentPregunta >= preguntas.length){
    preguntaTexto.innerHTML = "";
    respuestasContainer.innerHTML = "";
    resultadoDiv.textContent = `🎉 ¡Terminaste! Acertaste ${score} de ${preguntas.length} preguntas. 💖`;
    return;
  }

  const pregunta = preguntas[currentPregunta];
  preguntaTexto.textContent = pregunta.pregunta;

  respuestasContainer.innerHTML = "";

  pregunta.respuestas.forEach(resp => {
    const btn = document.createElement("button");
    btn.classList.add("respuesta-btn");
    btn.textContent = resp;

    btn.onclick = () => {
      Array.from(respuestasContainer.children).forEach(b => b.disabled = true);

      // Confeti de sticker
      crearConfeti(pregunta.img);

      if(resp === pregunta.correcta){
        score++;
        btn.style.backgroundColor = "#4CAF50";
        resultadoDiv.textContent = "✅ Correcto!";
      } else {
        btn.style.backgroundColor = "#DC143C";
        resultadoDiv.textContent = `❌ Incorrecto! La correcta era: ${pregunta.correcta}`;
      }

      setTimeout(()=>{
        currentPregunta++;
        resultadoDiv.textContent = "";
        cargarPregunta();
      },1500);
    };

    respuestasContainer.appendChild(btn);
  });
}

// Crear confeti con sticker
function crearConfeti(src){
  for(let i=0;i<20;i++){ // cantidad de stickers por respuesta
    const sticker = document.createElement("img");
    sticker.src = src;
    sticker.classList.add("sticker-confeti");
    sticker.style.left = Math.random()*100+"%";
    sticker.style.width = `${35 + Math.random()*20}px`;
    sticker.style.animationDuration = `${3 + Math.random()*2}s`;
    confetiContainer.appendChild(sticker);

    setTimeout(()=> confetiContainer.removeChild(sticker),5000);
  }
}

cargarPregunta();
