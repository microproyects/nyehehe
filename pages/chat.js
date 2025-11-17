import {
  db, auth,
  collection, getDocs, addDoc, query, orderBy, limit,
  serverTimestamp, deleteDoc, doc
} from "./firebase.js";

// UTILIDAD PARA BASE64
function toBase64(file) {
  return new Promise(res => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(file);
  });
}

// COMPRESIÓN
async function compressImage(file) {
  const img = await imageCompression(file, {
    maxSizeMB: 0.09, // 90KB MAX
    maxWidthOrHeight: 800
  });
  return toBase64(img);
}

// ELEMENTOS
const roomsList = document.getElementById("roomsList");
const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const imgInput = document.getElementById("imgInput");
const imgBtn = document.getElementById("imgBtn");

let currentRoomId = null;

// ======================
// CARGAR SOLO UNA VEZ
// ======================
async function loadRooms() {
  const ref = collection(db, "rooms");
  const snap = await getDocs(ref);

  roomsList.innerHTML = "";
  snap.forEach(doc => {
    const div = document.createElement("div");
    div.className = "room";
    div.textContent = doc.data().name;
    div.onclick = () => openRoom(doc.id);
    roomsList.appendChild(div);
  });
}
loadRooms();

// =======================
// ABRIR ROOM
// =======================
async function openRoom(id) {
  currentRoomId = id;

  messagesDiv.innerHTML = "";

  const ref = collection(db, "rooms", id, "messages");
  const q = query(ref, orderBy("createdAt", "desc"), limit(40));
  const snap = await getDocs(q);

  snap.forEach(doc => renderMessage(doc.data(), doc.id));

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ==============
// ENVIAR TEXTO
// ==============
sendBtn.onclick = async () => {
  if (!msgInput.value.trim()) return;
  await sendMsg({ text: msgInput.value });
  msgInput.value = "";
};

async function sendMsg(data) {
  if (!currentRoomId) return alert("Selecciona un chat primero");

  data.createdAt = serverTimestamp();
  data.uid = auth.currentUser.uid;
  data.profile = data.uid === "YO"
    ? "daniel.jpg"
    : "leidy.jpg";

  await addDoc(collection(db, "rooms", currentRoomId, "messages"), data);
}

// ==============
// IMAGEN
// ==============
imgBtn.onclick = () => imgInput.click();
imgInput.onchange = async () => {
  const base64 = await compressImage(imgInput.files[0]);
  await sendMsg({ image: base64 });
};

// ==============
// RENDER
// ==============
function renderMessage(msg, id) {
  const div = document.createElement("div");
  div.className = "msg";

  div.innerHTML = `
    <img class="pfp" src="${msg.profile}">
    <div class="bubble">
        ${msg.text || ""}
        ${msg.image ? `<img class="msg-img" src="${msg.image}">` : ""}
    </div>
  `;

  div.onclick = () => react(div);
  messagesDiv.appendChild(div);
}

// ==============
// REACCIONES
// ==============
function react(el) {
  if (!el.dataset.reacted) {
    el.dataset.reacted = "👍";
    el.querySelector(".bubble").innerHTML += ` <span>👍</span>`;
  } else {
    delete el.dataset.reacted;
    el.querySelector("span").remove();
  }
}

// ===========================
// AUTOLIMPIEZA (AHORRAR CUOTAS)
// ===========================
async function cleanupOldMessages(roomId) {
  const ref = collection(db, "rooms", roomId, "messages");
  const q = query(ref, orderBy("createdAt"), limit(200));
  const snap = await getDocs(q);

  if (snap.size > 150) {
    const extra = snap.size - 150;
    let count = 0;

    snap.forEach(async d => {
      if (count++ < extra) await deleteDoc(doc.ref);
    });
  }
}
