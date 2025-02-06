<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $paciente_id = $_GET['paciente_id'];

    $sql = "SELECT descripcion, progreso, fecha_inicio, fecha_fin FROM diagnosticos WHERE paciente_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $paciente_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "No se encontró diagnóstico"]);
    }

    $stmt->close();
    $conn->close();
}
?>
