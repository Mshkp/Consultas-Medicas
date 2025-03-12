<?php
header('Content-Type: application/json');
include 'conexion.php';

$query = "SELECT nombre, apellidos, especialidad, created_at AS fecha_registro 
          FROM medicos";
$result = $conn->query($query);

$doctores = [];
while ($row = $result->fetch_assoc()) {
    $doctores[] = $row;
}

echo json_encode($doctores);
?>