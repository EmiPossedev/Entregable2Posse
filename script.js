// Lista de eventos con nombre, precio y número
    const eventos = [
      { nombre: "Recital de Rock", precio: 50000, id: 1, hora: "20:00 hs", lugar: "Estadio Brigadier Estanislao Lopez"},
      { nombre: "Fiesta Electrónica", precio: 30000, id: 2, hora: "00:00 hs", lugar: "Complejo Complot"},
      { nombre: "Obra de Teatro", precio: 10000, id: 3, hora: "21:00 hs", lugar: "Teatro Municipal"}  
    ];

    // Referencias a elementos del DOM
    const seleccionarEvento = document.getElementById("evento");
    const cantidadEntradas = document.getElementById("cantidad");
    const botonCalcular = document.getElementById("calcular");
    const parrafoResultado = document.getElementById("resultado");

    // Agregar opciones al menú desplegable
    eventos.forEach(evento => {
      const opcion = document.createElement("option");
      opcion.value = evento.id;
      opcion.text = `${evento.nombre} - $${evento.precio}`;
      seleccionarEvento.appendChild(opcion);
    });

    // Escuchar el clic del botón
    botonCalcular.addEventListener("click", () => {
      const idSeleccionado = parseInt(seleccionarEvento.value);
      const cantidad = parseInt(cantidadEntradas.value);

      if (isNaN(idSeleccionado) || isNaN(cantidad) || cantidad <= 0) {
        parrafoResultado.innerText = "⚠️ Por favor, seleccioná un evento y una cantidad válida.";
        return;
      }

      const evento = eventos.find(e => e.id === idSeleccionado);
      const total = evento.precio * cantidad;

      parrafoResultado.innerText = `🎟️ Compraste ${cantidad} entrada(s) para "${evento.nombre}".
Horario: ${evento.hora} - Ubicación: ${evento.lugar}.
Total a pagar: $${total}.`;
    });