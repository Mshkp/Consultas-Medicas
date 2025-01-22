<?php

// Configuración de conexión
$host = 'localhost';       // Normalmente es 'localhost' en servidores locales
$username = 'root';        // Por defecto, el usuario en XAMPP es 'root'
$password = '';            // La contraseña para 'root' está vacía por defecto en XAMPP
$database = 'consultas';   // Asegúrate de que este sea el nombre correcto de tu base de datos

// Crear conexión
$conn = new mysqli($host, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}
?>
