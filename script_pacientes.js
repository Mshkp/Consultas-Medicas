document.addEventListener("DOMContentLoaded", function() {
    cargarPacientes();
});

function cargarPacientes() {
    // Simulación de datos obtenidos desde una API o base de datos
    const pacientes = [
        { nombre: "Juan Pérez", edad: 45, ultimaConsulta: "2025-02-01", diagnostico: "Hipertensión" },
        { nombre: "María López", edad: 38, ultimaConsulta: "2025-01-15", diagnostico: "Diabetes Tipo 2" },
        { nombre: "Carlos Ramírez", edad: 50, ultimaConsulta: "2025-01-20", diagnostico: "Colesterol alto" }
    ];

    const tabla = document.getElementById("tabla-pacientes");
    tabla.innerHTML = "";

    pacientes.forEach(paciente => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${paciente.nombre}</td>
            <td>${paciente.edad}</td>
            <td>${paciente.ultimaConsulta}</td>
            <td>${paciente.diagnostico}</td>
            <td><button onclick="verDetalle('${paciente.nombre}')">Ver Detalle</button></td>
        `;
        tabla.appendChild(fila);
    });
}

function verDetalle(nombre) {
    alert(`Mostrando detalles del paciente: ${nombre}`);
    // Aquí se podría redirigir a una página con más información del paciente
}
