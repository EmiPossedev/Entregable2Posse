const eventos = [
  { id: 1, nombre: "Recital de Rock", precio: 50000, hora: "20:00", lugar: "Estadio" },
  { id: 2, nombre: "Fiesta Electrónica", precio: 30000, hora: "00:00", lugar: "Complejo Complot" },
  { id: 3, nombre: "Obra de Teatro", precio: 10000, hora: "21:00", lugar: "Teatro Municipal" }
];

const select     = document.getElementById("evento");
const input      = document.getElementById("cantidad");
const btnAgregar = document.getElementById("agregar");
const btnCalcular = document.getElementById("calcular");
const btnConfirmar = document.getElementById("confirmar");
const mensaje    = document.getElementById("mensaje");
const lista      = document.getElementById("carrito");
const totalTxt   = document.getElementById("total");

// Cargar opciones en el select
eventos.forEach(e => {
  const option = document.createElement("option");
  option.value = e.id;
  option.text = `${e.nombre} - $${e.precio}`;
  select.appendChild(option);
});

// Cargar carrito de localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
mostrarCarrito();

// Cargar última selección
const ultima = JSON.parse(sessionStorage.getItem("seleccion"));
if (ultima) {
  select.value = ultima.id;
  input.value = ultima.cantidad;
}

// Botón Agregar al carrito
btnAgregar.addEventListener("click", () => {
  const id = parseInt(select.value);
  const cantidad = parseInt(input.value);

  if (!id || !cantidad || cantidad <= 0) {
    mensaje.innerText = "⚠️ Seleccioná un evento y cantidad válida.";
    return;
  }

  const evento = eventos.find(e => e.id === id);
  const total = evento.precio * cantidad;

  // Guardar selección de sesión
  sessionStorage.setItem("seleccion", JSON.stringify({ id, cantidad }));

  // Agregar al carrito
  carrito.push({
    nombre: evento.nombre,
    cantidad,
    total,
    hora: evento.hora,
    lugar: evento.lugar
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mensaje.innerText = `✅ ${cantidad} entrada(s) para "${evento.nombre}" agregadas.`;
  mostrarCarrito();

  // Ocultar total y botón de confirmación si se agregó algo nuevo
  totalTxt.innerText = "";
  btnConfirmar.style.display = "none";
});

// Botón Calcular el total del carrito
btnCalcular.addEventListener("click", () => {
  if (carrito.length === 0) {
    totalTxt.innerText = "🛒 El carrito está vacío.";
    btnConfirmar.style.display = "none";
    return;
  }

  let totalFinal = 0;
  carrito.forEach(item => totalFinal += item.total);

  totalTxt.innerText = `💰 Total del carrito: $${totalFinal}`;
  btnConfirmar.style.display = "inline";
});

// Botón Confirmar compra
btnConfirmar.addEventListener("click", () => {
  if (carrito.length === 0) return;

  alert("✅ ¡Gracias por tu compra! Disfrutá el evento 🎉");
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
  totalTxt.innerText = "";
  mensaje.innerText = "";
  btnConfirmar.style.display = "none";
});

// Función para mostrar el carrito en la lista
function mostrarCarrito() {
  lista.innerHTML = "";
  if (carrito.length === 0) {
    lista.innerHTML = "<li>El carrito está vacío.</li>";
    return;
  }

  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerText = `#${i + 1} ${item.nombre} - ${item.cantidad} entrada(s) - $${item.total}
Horario: ${item.hora} - Lugar: ${item.lugar}`;
    lista.appendChild(li);
  });
}
