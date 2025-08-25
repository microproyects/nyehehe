// Puedes agregar alguna animación de botones o corazones flotando
const botones = document.querySelectorAll('.categorias button');
botones.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.backgroundColor = '#e6b3ff';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.backgroundColor = '#d39ff7';
  });
});
