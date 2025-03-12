<?php
header('Content-Type: application/json');
require 'conexion.php'; // Archivo donde conectas a la BD

// Obtener el ID del paciente (ajústalo según tu sistema)
$paciente_id = 1; 

// Obtener diagnóstico
$query_diag = $conn->prepare("SELECT diagnostico FROM pacientes WHERE id = ?");
$query_diag->bind_param("i", $paciente_id);
$query_diag->execute();
$result_diag = $query_diag->get_result()->fetch_assoc();
$diagnostico = $result_diag['diagnostico'] ?? "Sin diagnóstico";

// Obtener progreso de consultas
$query_consultas = $conn->prepare("
    SELECT COUNT(*) AS completadas FROM consultas WHERE paciente_id = ? AND estado = 'completada'
");
$query_consultas->bind_param("i", $paciente_id);
$query_consultas->execute();
$result_consultas = $query_consultas->get_result()->fetch_assoc();
$completadas = $result_consultas['completadas'] ?? 0;

$query_total = $conn->prepare("
    SELECT COUNT(*) AS total FROM consultas WHERE paciente_id = ?
");
$query_total->bind_param("i", $paciente_id);
$query_total->execute();
$result_total = $query_total->get_result()->fetch_assoc();
$total = $result_total['total'] ?? 1; // Evitar división por cero

// Obtener lista de consultas
$query_lista = $conn->prepare("
    SELECT fecha, estado FROM consultas WHERE paciente_id = ? ORDER BY fecha
");
$query_lista->bind_param("i", $paciente_id);
$query_lista->execute();
$result_lista = $query_lista->get_result();
$consultas = [];
while ($row = $result_lista->fetch_assoc()) {
    $consultas[] = "{$row['fecha']} - {$row['estado']}";
}

// Enviar respuesta JSON
echo json_encode([
    "diagnostico" => $diagnostico,
    "consultas_completadas" => $completadas,
    "total_consultas" => $total,
    "consultas" => $consultas
]);
?>
