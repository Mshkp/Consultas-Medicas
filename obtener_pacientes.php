<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $doctor_id = $_GET['doctor_id'];

    $sql = "SELECT u.id, u.name, d.descripcion, d.progreso, d.fecha_fin 
            FROM usuarios u 
            JOIN diagnosticos d ON u.id = d.paciente_id 
            WHERE d.doctor_id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $doctor_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $pacientes = [];

    while ($row = $result->fetch_assoc()) {
        $pacientes[] = $row;
    }

    echo json_encode($pacientes);

    $stmt->close();
    $conn->close();
}
?>
