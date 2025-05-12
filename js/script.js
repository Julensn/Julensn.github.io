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

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica del Formulario de Reservación (si existe) ---
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // ... (tu código para manejar el submit del formulario) ...
             // Simulación actual:
            const nameInput = document.getElementById('name');
            const name = nameInput ? nameInput.value : 'Cliente'; // Evita error si no hay input name
            alert(`(Simulación) Gracias ${name}, tu reservación ha sido recibida.`);
            this.reset(); 
        });
    }

    // --- Lógica del Menú Responsive ---
    const header = document.querySelector('header');
    const nav = document.querySelector('nav'); // Selecciona el <nav>
    const navList = document.querySelector('nav ul'); // Selecciona la lista <ul>

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
            const isExpanded = navList.classList.toggle('active'); // Alterna la clase .active en <ul>
            menuToggle.classList.toggle('active'); // Alterna clase en el botón para animación X
            menuToggle.setAttribute('aria-expanded', isExpanded); // Actualiza estado ARIA
            menuToggle.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
        }

        menuToggle.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer clic en un enlace (útil en móvil)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Cierra el menú solo si está activo y estamos en vista móvil
                if (window.innerWidth <= 768 && navList.classList.contains('active')) {
                    toggleMenu(); 
                }
                 // Opcional: Añadir clase 'active' al enlace clickeado y quitarla de otros
                 navList.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                 link.classList.add('active');
            });
        });

        // Opcional: Cerrar menú si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Ajustar al cambiar tamaño de pantalla
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                 // Si estamos en pantalla grande, asegura que el menú no esté 'activo'
                 // y el botón toggle esté reseteado
                 if (navList.classList.contains('active')) {
                      navList.classList.remove('active');
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

}); // Fin de DOMContentLoaded