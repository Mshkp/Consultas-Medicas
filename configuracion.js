// Función para guardar la configuración
function saveSettings() {
    const username = document.getElementById('username').value;
    const theme = document.getElementById('theme').value;
    const notifications = document.getElementById('notifications').checked;
    const language = document.getElementById('language').value;
    const fontSize = document.getElementById('fontSize').value;
  
    // Simulación de guardar configuración en localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('language', language);
    localStorage.setItem('fontSize', fontSize);
  
    showStatusMessage("Configuración guardada exitosamente.");
  }
  
  // Función para restaurar la configuración a los valores predeterminados
  function resetSettings() {
    localStorage.removeItem('username');
    localStorage.removeItem('theme');
    localStorage.removeItem('notifications');
    localStorage.removeItem('language');
    localStorage.removeItem('fontSize');
  
    document.getElementById('configForm').reset();
    showStatusMessage("Configuración restaurada a los predeterminados.");
  }
  
  // Función para mostrar mensajes de estado
  function showStatusMessage(message) {
    const statusMessageElement = document.getElementById('statusMessage');
    statusMessageElement.textContent = message;
    statusMessageElement.classList.add('show');
  
    setTimeout(() => {
      statusMessageElement.classList.remove('show');
    }, 3000);
  }
  
  // Función para regresar al Lobby
  function goBackToLobby() {
    window.location.href = "Lobby-Paciente.html";  // Cambia la URL según tu necesidad
  }
  
  // Cargar la configuración si está guardada en localStorage
  document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const theme = localStorage.getItem('theme');
    const notifications = localStorage.getItem('notifications') === 'true';
    const language = localStorage.getItem('language');
    const fontSize = localStorage.getItem('fontSize');
  
    if (username) document.getElementById('username').value = username;
    if (theme) document.getElementById('theme').value = theme;
    if (notifications) document.getElementById('notifications').checked = notifications;
    if (language) document.getElementById('language').value = language;
    if (fontSize) document.getElementById('fontSize').value = fontSize;
  });
  