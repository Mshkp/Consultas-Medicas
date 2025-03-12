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
function CerrarSesion() {
    alert('Sesión cerrada correctamente');
    window.location.href = 'indexDoc.html';
}


// Cargar las solicitudes pendientes al abrir la página
document.addEventListener('DOMContentLoaded', function () {
    fetch('obtener_solicitudes.php?doctorId=1') // Cambiar el ID del doctor según la sesión
        .then(response => response.json())
        .then(data => {
            const solicitudesList = document.getElementById('solicitudes-list');
            data.forEach(solicitud => {
                const solicitudDiv = document.createElement('div');
                solicitudDiv.className = 'solicitud-card';
                solicitudDiv.innerHTML = `
                    <p>Paciente: ${solicitud.paciente_nombre}</p>
                    <p>Especialidad: ${solicitud.especialidad}</p>
                    <button onclick="aceptarSolicitud(${solicitud.id})">Aceptar</button>
                    <button onclick="rechazarSolicitud(${solicitud.id})">Rechazar</button>
                `;
                solicitudesList.appendChild(solicitudDiv);
            });
        });
});

// Función para aceptar una solicitud
function aceptarSolicitud(solicitudId) {
    fetch('aceptar_solicitud.php', {
        method: 'POST',
        body: JSON.stringify({ solicitudId }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Solicitud aceptada');
            location.reload(); // Recargar la página para actualizar la lista
        } else {
            alert('Error al aceptar la solicitud');
        }
    });
}

// Función para rechazar una solicitud
function rechazarSolicitud(solicitudId) {
    fetch('rechazar_solicitud.php', {
        method: 'POST',
        body: JSON.stringify({ solicitudId }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Solicitud rechazada');
            location.reload(); // Recargar la página para actualizar la lista
        } else {
            alert('Error al rechazar la solicitud');
        }
    });
}