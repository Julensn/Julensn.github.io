// Manejo del formulario de reservaciones
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) { // Verifica que el formulario exista en la página actual
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const comments = document.getElementById('comments').value;

        // --- ¡IMPORTANTE! ---
        // Aquí necesitas enviar los datos a un servidor (backend)
        // para procesar la reservación. El alert es solo una simulación.
        // Ejemplo usando Fetch API (requiere un endpoint en tu servidor):
        /*
        fetch('/api/reservations', { // URL de tu API
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, date, time, guests, comments })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert(`Gracias ${name}, tu reservación ha sido enviada. Te contactaremos pronto.`);
            this.reset(); // Limpiar el formulario si fue exitoso
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al enviar tu reservación. Por favor, inténtalo de nuevo.');
        });
        */

        // Simulación actual:
        alert(`(Simulación) Gracias ${name}, tu reservación para ${guests} personas el ${date} a las ${time} ha sido recibida. Te contactaremos para confirmar.`);
        this.reset(); // Limpiar el formulario

    }); // <--- Llave de cierre que faltaba
} // <--- Cierre del if (reservationForm)

// Lógica del menú responsive (fuera del listener del form)
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav ul'); // Selecciona la lista ul

    if (!header || !nav) return; // Salir si no existen header o nav

    // Crear botón toggle solo si no existe
    let menuToggle = header.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.setAttribute('aria-expanded', 'false'); // Para accesibilidad
        header.appendChild(menuToggle); // Añadir al header
    }

    // Función para mostrar/ocultar menú
    function toggleMenu() {
         const isExpanded = nav.classList.toggle('active'); // Usa una clase en lugar de display inline
         menuToggle.setAttribute('aria-expanded', isExpanded);
         menuToggle.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace (si está en modo móvil)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && nav.classList.contains('active')) {
               toggleMenu(); // Cierra el menú
            }
        });
    });

    // Ajustar menú al cambiar tamaño de pantalla (simplificado)
     window.addEventListener('resize', function() {
         if (window.innerWidth > 768) {
             nav.classList.remove('active'); // Asegúrate de que esté cerrado en desktop
             menuToggle.setAttribute('aria-expanded', 'false');
             menuToggle.setAttribute('aria-label', 'Abrir menú');
         }
     });

     // Ocultar inicialmente en móvil si CSS no lo hace (fallback)
     if (window.innerWidth <= 768) {
        nav.classList.remove('active');
     }
});