function verPacientes() {
    window.location.href = 'pacientes.html';
}

function verConsultas() {
    window.location.href = 'consultas.html';
}

function verDiagnosticos() {
    window.location.href = 'diagnosticos.html';
}

function configurar() {
    window.location.href = 'configuracion.html';
}

function cerrarSesion() {
    alert('Sesión cerrada correctamente');
    window.location.href = 'login-register_Doc.html';
}

// Función para manejar el envío del formulario de diagnóstico
function actualizarDiagnostico() {
    const pacienteId = document.getElementById("paciente_id").value;
    const descripcion = document.getElementById("descripcion").value;
    const progreso = document.getElementById("progreso").value;
    const fechaInicio = document.getElementById("fecha_inicio").value;
    const fechaFin = document.getElementById("fecha_fin").value;

    // Validación simple
    if (!pacienteId || !descripcion || !progreso || !fechaInicio || !fechaFin) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Enviar los datos al servidor usando fetch
    fetch('actualizar_diagnostico.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `paciente_id=${pacienteId}&descripcion=${descripcion}&progreso=${progreso}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`
    })
    .then(response => response.text())
    .then(data => {
        alert("Diagnóstico actualizado correctamente.");
        // Opcional: Redirigir a otra página o cerrar el formulario
        window.location.href = 'diagnosticos.html'; // Redirige a la lista de diagnósticos después de la actualización
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
