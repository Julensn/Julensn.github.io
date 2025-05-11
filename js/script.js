// Manejo del formulario de reservaciones
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const comments = document.getElementById('comments').value;
    
    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora solo mostraremos una alerta
    alert(`Gracias ${name}, tu reservación para ${guests} personas el ${date} a las ${time} ha sido recibida. Te contactaremos para confirmar.`);
    
    // Limpiar el formulario
    this.reset();
});

// Funcionalidad adicional puede ir aquí
// Por ejemplo, cargar el menú desde una API, validaciones adicionales, etc.