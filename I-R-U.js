// Mantener la funcionalidad original de cambio entre formularios
const container = document.getElementById('container');
const goToRegister = document.getElementById('register');  // Usar el ID correcto
const goToLogin = document.getElementById('login');  // Usar el ID correcto

goToRegister.addEventListener('click', () => {
    container.classList.add("active");
});

goToLogin.addEventListener('click', () => {
    container.classList.remove("active");
});

// Funcionalidad de registro
document.addEventListener('DOMContentLoaded', (event) => {
    const registerForm = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        
        try {
            const response = await fetch('registro.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.error) {
                errorMessage.classList.remove('hidden');
                errorMessage.textContent = data.error;
                successMessage.classList.add('hidden');
            } else {
                successMessage.classList.remove('hidden');
                successMessage.textContent = data.success;
                errorMessage.classList.add('hidden');
                registerForm.reset();
            }
        } catch (error) {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Error en el servidor';
            successMessage.classList.add('hidden');
        }
    });
});

// Funcionalidad de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Asegúrate de que el formulario no se envíe por defecto

    const loginEmail = document.getElementById('loginEmail').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();

    console.log('Email:', loginEmail); // Verifica el valor del email
    console.log('Password:', loginPassword); // Verifica el valor de la contraseña

    // Validación de campos vacíos
    if (!loginEmail || !loginPassword) {
        alert('Por favor, complete ambos campos.');
        console.log('Campos vacíos, no se envía la solicitud.');
        return; // No enviar la solicitud si los campos están vacíos
    }

    const formData = new FormData();
    formData.append('email', loginEmail);
    formData.append('password', loginPassword);

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error); // Muestra el error
        } else {
            window.location.href = 'Lobby-Paciente.html'; // Redirige al lobby
        }
    } catch (error) {
        alert('Error en el servidor');
    }
});



document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevenir el envío del formulario

    // Obtener los valores de los campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar si los campos están vacíos
    if (!name || !email || !password) {
        document.getElementById('errorMessage').classList.remove('hidden');
        return;
    }

    // Enviar los datos al servidor con fetch
    fetch('registro_usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('successMessage').classList.remove('hidden');
            document.getElementById('registerForm').reset();  // Limpiar formulario
        } else {
            document.getElementById('errorMessage').textContent = data.message;
            document.getElementById('errorMessage').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
        document.getElementById('errorMessage').textContent = 'Ocurrió un error inesperado.';
        document.getElementById('errorMessage').classList.remove('hidden');
    });
});


