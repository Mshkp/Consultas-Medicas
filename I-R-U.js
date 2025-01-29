// Funcionalidad para cambiar entre formularios de Registro y Login
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const goToRegister = document.getElementById('goToRegister');
    const goToLogin = document.getElementById('goToLogin');
    
    // Cambiar al formulario de registro
    goToRegister.addEventListener('click', () => {
        container.classList.add('active');
    });
    
    // Cambiar al formulario de login
    goToLogin.addEventListener('click', () => {
        container.classList.remove('active');
    });
    
    // Funcionalidad de registro
    const registerForm = document.getElementById('registerForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!name || !email || !password) {
            errorMessage.textContent = '*Todos los campos son obligatorios*';
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
            return;
        }
        
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
                successMessage.classList.add('hidden');
                errorMessage.textContent = data.error;
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
    
    // Funcionalidad de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();
        
        if (!loginEmail || !loginPassword) {
            alert('Por favor, complete ambos campos.');
            return;
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
                alert(data.error);
            } else {
                window.location.href = 'Lobby-Paciente.html'; // Redirige al lobby
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    });
});
