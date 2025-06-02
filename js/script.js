document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  const messageBox = document.getElementById('reservation-message');
  const afternoonCount = document.getElementById('afternoon-count');
  const nightCount = document.getElementById('night-count');
  const dateInput = document.getElementById('date');
  const shiftSelect = document.getElementById('shift');

  const API_URL = 'https://script.google.com/macros/s/AKfycbwzCY9t9Z0iTibLyflnIE5xvm4FmK8kuenMYQNslmbQVCEqNmslVwGsAZYisyS48kI9/exec';

  // Configurar fecha mínima (hoy) y bloquear lunes/martes
  dateInput.min = new Date().toISOString().split('T')[0];
  
  // Obtener disponibilidad al cambiar fecha
  dateInput.addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      // Validar día de la semana
      const dateObj = new Date(selectedDate);
      const day = dateObj.getDay();
      
      if (day === 1 || day === 2) { // Lunes=1, Martes=2
        messageBox.textContent = 'El restaurante está cerrado los lunes y martes';
        messageBox.style.display = 'block';
        afternoonCount.textContent = '0';
        nightCount.textContent = '0';
        dateInput.value = '';
      } else {
        messageBox.style.display = 'none';
        fetchAvailability(selectedDate);
      }
    }
  });

  // Función para obtener disponibilidad
  async function fetchAvailability(date) {
    try {
      const response = await fetch(`${API_URL}?date=${date}`);
      const data = await response.json();

      if (data.success) {
        afternoonCount.textContent = data.afternoonAvailable;
        nightCount.textContent = data.nightAvailable;
      } else {
        messageBox.textContent = data.message || 'Error al obtener disponibilidad';
        messageBox.style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
      messageBox.textContent = 'Error de conexión. Intenta nuevamente.';
      messageBox.style.display = 'block';
    }
  }

  // Manejar envío de formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar día seleccionado
    const dateObj = new Date(form.date.value);
    const day = dateObj.getDay();
    if (day === 1 || day === 2) {
      messageBox.textContent = 'No se pueden reservar los lunes o martes';
      messageBox.style.display = 'block';
      return;
    }

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      date: form.date.value,
      shift: form.shift.value,
      guests: form.guests.value,
      comments: form.comments.value.trim()
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        messageBox.textContent = '¡Reserva realizada con éxito!';
        messageBox.style.color = 'green';
        messageBox.style.display = 'block';
        form.reset();
        
        // Actualizar disponibilidad
        if (formData.date) fetchAvailability(formData.date);
      } else {
        messageBox.textContent = result.message || 'Error al procesar reserva';
        messageBox.style.color = 'red';
        messageBox.style.display = 'block';
      }
    } catch (error) {
      console.error('Error:', error);
      messageBox.textContent = 'Error de conexión. Intenta nuevamente.';
      messageBox.style.color = 'red';
      messageBox.style.display = 'block';
    }
  });
});





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
  document.addEventListener('click', function (event) {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Ajustar al cambiar tamaño de pantalla
  window.addEventListener('resize', function () {
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
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

// Cerrar el modal
closeBtn.onclick = function () {
  modal.style.display = "none";
}

// Cerrar al hacer clic fuera de la imagen
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}