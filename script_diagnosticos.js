document.getElementById('formDiagnostico').addEventListener('submit', function (event) {
    event.preventDefault();

    const paciente = document.getElementById('paciente').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const progreso = document.getElementById('progreso').value.trim();

    if (!paciente || !descripcion || !progreso) {
        alert('Por favor, llena todos los campos.');
        return;
    }

    fetch('agregar_diagnostico.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ paciente, descripcion, progreso })
    })
    .then(response => response.json()) // Asegura que la respuesta sea JSON
    .then(data => {
        if (data.success) {
            alert(data.message);
            cargarDiagnosticos(); // Recargar la lista de diagnósticos
            document.getElementById('formDiagnostico').reset();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error al guardar el diagnóstico:', error);
        alert('Ocurrió un error al guardar el diagnóstico.');
    });
});

// Función para cargar la lista de diagnósticos (debe estar definida)
function cargarDiagnosticos() {
    fetch('obtener_diagnosticos.php')
        .then(response => response.json())
        .then(data => {
            // Código para mostrar los diagnósticos en la tabla
        })
        .catch(error => console.error('Error al cargar los diagnósticos:', error));
}
