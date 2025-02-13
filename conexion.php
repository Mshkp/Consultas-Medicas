<?php
$servername = "localhost"; // Cambia esto si tu base de datos está en otro servidor
$username = "root";        // Tu nombre de usuario de la base de datos
$password = "";            // Tu contraseña de la base de datos
$dbname = "consultas";       // Nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
