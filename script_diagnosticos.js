// Enviar el formulario para agregar o actualizar un diagnóstico
document.getElementById('formDiagnostico').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

    const id = document.getElementById('diagnostico_id').value;  // Obtener ID del diagnóstico si se está actualizando
    const paciente = document.getElementById('paciente').value;  // Obtener nombre del paciente
    const descripcion = document.getElementById('descripcion').value;  // Obtener descripción
    const progreso = document.getElementById('progreso').value;  // Obtener porcentaje de progreso

    // Asegúrate de que todos los campos estén llenos
    if (!paciente || !descripcion || !progreso) {
        alert('Por favor, llena todos los campos.');
        return;
    }

    // Determinar si es una actualización o una nueva inserción
    const url = id ? 'actualizar_diagnostico.php' : 'agregar_diagnostico.php';
    const method = id ? 'PUT' : 'POST';

    // Mostrar la información antes de enviarla
    console.log('Datos del formulario:', { id, paciente, descripcion, progreso });

    // Enviar la solicitud al servidor
    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}&paciente=${paciente}&descripcion=${descripcion}&progreso=${progreso}`
    })
    .then(response => response.json())  // Esperar una respuesta en formato JSON
    .then(data => {
        console.log('Respuesta del servidor:', data);  // Ver la respuesta del servidor
        alert(data.message);  // Mostrar el mensaje de la respuesta
        cargarDiagnosticos(); // Recargar los diagnósticos después de agregar o actualizar
        document.getElementById('formDiagnostico').reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.error('Error al guardar el diagnóstico:', error);
        alert('Ocurrió un error al guardar el diagnóstico.');
    });
});
