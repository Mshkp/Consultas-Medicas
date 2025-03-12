// Cambiar entre las pestañas de "Registrarse" y "Iniciar Sesión"
document.addEventListener("DOMContentLoaded", function () {
    const cedulaInput = document.getElementById("cedula");

    cedulaInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, ""); // Solo permite números
    });
});

document.querySelectorAll('.tab a').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Obtener el objetivo de la pestaña (id del contenido)
        const target = this.getAttribute('href').substring(1);

        // Eliminar la clase 'active' de todas las pestañas y contenidos
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content > div').forEach(content => content.style.display = 'none');

        // Agregar la clase 'active' a la pestaña y mostrar el contenido correspondiente
        this.parentElement.classList.add('active');
        document.getElementById(target).style.display = 'block';
    });
});

// Por defecto, mostrar el contenido de "Registrarse" al cargar la página
document.getElementById('signup').style.display = 'block';
document.getElementById('login').style.display = 'none';


// Registro de médico
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("registro_medico.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        alert(data.success);
        this.reset(); // Limpiar formulario después del registro
    } else {
        alert(data.error);
    }
});

// Inicio de sesión de médico
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("login_medico.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {
        window.location.href = "dashboard_medico.html"; // Redirigir a su dashboard
    } else {
        alert(data.error);
    }
});
