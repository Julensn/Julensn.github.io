document.addEventListener("DOMContentLoaded", function () {
  const reservaForm = document.getElementById("reserva-form");
  const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");
  const mensajeError = document.getElementById("mensaje-error");

  if (reservaForm) {
    reservaForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validar fecha y hora
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const personas = parseInt(document.getElementById("personas").value, 10);

      if (!validarDiaYHora(fecha, hora)) {
        mostrarMensaje(mensajeError, "El restaurante está cerrado ese día u hora. Cerrado lunes, martes o fuera de horarios permitidos.");
        return;
      }

      try {
        const disponible = await validarDisponibilidad(fecha, hora, personas);

        if (!disponible) {
          mostrarMensaje(mensajeError, "No hay cupo suficiente para esa hora. Máximo 23 personas por turno.");
          return;
        }

        await enviarFormulario(reservaForm);
        mostrarMensaje(mensajeConfirmacion, "¡Reserva enviada con éxito!");
        reservaForm.reset();
      } catch (error) {
        console.error("Error al enviar la reserva:", error);
        mostrarMensaje(mensajeError, "Ocurrió un error al enviar la reserva. Intenta nuevamente.");
      }
    });
  }
});

// Función para validar día y hora
function validarDiaYHora(fechaStr, horaStr) {
  const fecha = new Date(fechaStr);
  const dia = fecha.getUTCDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  if (dia === 1 || dia === 2) return false; // Lunes y martes cerrado

  // Horarios permitidos: 13:30–15:00 y 20:30–22:30
  return ["13:30", "20:30"].includes(horaStr);
}

// Función para validar disponibilidad
async function validarDisponibilidad(fecha, hora, personas) {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxCaZ9lvNyvQFJK_TD3TzSJjpBOjNbCu6Wci6oxgFtiUsgx4b8SIM1QRHEXmjNAyhq_/exec");
    const data = await response.json();

    // Filtrar reservas para misma fecha y hora
    const reservas = data.filter(
      (reserva) => reserva.Fecha === fecha && reserva.Hora === hora
    );

    const totalPersonas = reservas.reduce(
      (sum, r) => sum + parseInt(r.Personas, 10),
      0
    );

    return totalPersonas + personas <= 23;
  } catch (error) {
    console.error("Error al validar disponibilidad:", error);
    return false;
  }
}

// Función para enviar formulario
async function enviarFormulario(form) {
  const formData = new FormData(form);
  const payload = {};
  formData.forEach((value, key) => {
    payload[key] = value;
  });

  await fetch("https://script.google.com/macros/s/AKfycbxCaZ9lvNyvQFJK_TD3TzSJjpBOjNbCu6Wci6oxgFtiUsgx4b8SIM1QRHEXmjNAyhq_/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
  });
}

// Función para mostrar mensajes
function mostrarMensaje(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.display = "block";

  setTimeout(() => {
    elemento.style.display = "none";
  }, 4000);
}





    
  // --- Lógica del Menú Responsive ---
const header = document.querySelector('header');
const nav = document.querySelector('nav'); // Selecciona el <nav>
const navList = document.querySelector('nav .nav-list'); // Selecciona la lista <ul>

if (header && nav && navList) { // Verifica que existan
    // Crear botón toggle si no existe (mejor añadirlo directamente en HTML)
    // O si lo creas dinámicamente:
    let menuToggle = header.querySelector('.menu-toggle');
    if (!menuToggle) {
         menuToggle = document.createElement('button'); // Usa <button> semánticamente
         menuToggle.className = 'menu-toggle';
         menuToggle.setAttribute('aria-label', 'Abrir menú');
         menuToggle.setAttribute('aria-expanded', 'false'); // Estado inicial
         menuToggle.innerHTML = '<span></span><span></span><span></span>'; // Las líneas del icono
         // Inserta el botón en el header (ajusta según tu estructura)
         // Por ejemplo, antes de <nav>
         header.insertBefore(menuToggle, nav); 
    }
    
    // Función para mostrar/ocultar menú
function toggleMenu() {
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
  menuToggle.setAttribute('aria-label', nav.classList.contains('active') ? 'Cerrar menú' : 'Abrir menú');
}
document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);





    // Opcional: Cerrar menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Ajustar al cambiar tamaño de pantalla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
             // Si estamos en pantalla grande, asegura que el menú no esté 'activo'
             // y el botón toggle esté reseteado
             if (nav.classList.contains('active')) {
                  nav.classList.remove('active');
                  menuToggle.classList.remove('active');
                  menuToggle.setAttribute('aria-expanded', 'false');
                  menuToggle.setAttribute('aria-label', 'Abrir menú');
             }
        }
    });
}



    // --- Marcar enlace activo según la página actual ---
    const currentPage = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo (index.html, menu.html, etc.)
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) { // Considera la raíz como index.html
            link.classList.add('active');
            // Si el enlace activo está dentro del menú móvil y este está cerrado, no hacemos nada especial aquí
            // La clase 'active' se usará para estilizarlo (ver CSS)
        } else {
            link.classList.remove('active'); // Asegura que otros no estén activos
        }
    });




    // MENU
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});




// MODAL PARA AMPLIAR LAS IMAGENES
 const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  // Añadir evento a todas las imágenes de clase menu-item-image
  document.querySelectorAll(".menu-item-image, .ampliar-imagen").forEach(img => {
    img.addEventListener("click", function() {
      modal.style.display = "block";
      modalImg.src = this.src;
    });
  });

  // Cerrar el modal
  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  // Cerrar al hacer clic fuera de la imagen
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }