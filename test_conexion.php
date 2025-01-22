<?php
include 'config.php';

if ($conn->connect_error) {
    echo "Error de conexión: " . $conn->connect_error;
} else {
    echo "Conexión exitosa a la base de datos.";
}
?>
