const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', (event) => {
    const registerButton = document.getElementById('registerButton');
    const successMessage = document.getElementById('successMessage');

    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        successMessage.classList.remove('hidden');
        successMessage.textContent = 'Cuenta registrada exitosamente';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const registerButton = document.getElementById('registerButton');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (name === '' || email === '' || password === '') {
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = 'Todos los campos son obligatorios';
        } else {
            successMessage.classList.remove('hidden');
            successMessage.textContent = 'Cuenta registrada exitosamente';
        }
    });
});