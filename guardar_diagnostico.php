<?php
require 'conexion.php'; // Tu conexión a la base de datos
session_start();

$paciente_id = $_POST['paciente_id'];
$descripcion = $_POST['descripcion'];
$fecha_inicio = $_POST['fecha_inicio'];
$fecha_fin = $_POST['fecha_fin'];
$doctor_id = $_SESSION['doctor_id']; // Asegúrate de tener el ID del médico en sesión

$sql = "INSERT INTO diagnosticos (paciente_id, doctor_id, descripcion, fecha_inicio, fecha_fin) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisss", $paciente_id, $doctor_id, $descripcion, $fecha_inicio, $fecha_fin);

if ($stmt->execute()) {
    echo "Diagnóstico guardado con éxito.";
} else {
    echo "Error al guardar el diagnóstico: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
