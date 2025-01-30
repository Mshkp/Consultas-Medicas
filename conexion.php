<?php
$servername = "localhost"; // Cambia si tu servidor de base de datos es diferente
$username = "root";        // Cambia el nombre de usuario si es necesario
$password = "";            // Cambia la contraseña si es necesario
$dbname = "consultas";     // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
