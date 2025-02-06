<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $paciente_id = $_POST['paciente_id'];
    $doctor_id = $_POST['doctor_id'];
    $descripcion = $_POST['descripcion'];
    $progreso = $_POST['progreso'];
    $fecha_fin = $_POST['fecha_fin'];

    $sql = "INSERT INTO diagnosticos (paciente_id, doctor_id, descripcion, progreso, fecha_inicio, fecha_fin) 
            VALUES (?, ?, ?, ?, NOW(), ?) 
            ON DUPLICATE KEY UPDATE descripcion=?, progreso=?, fecha_fin=?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisissis", $paciente_id, $doctor_id, $descripcion, $progreso, $fecha_fin, $descripcion, $progreso, $fecha_fin);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
