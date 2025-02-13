<?php
// Asegurarse de que los errores PHP se muestren
error_reporting(E_ALL);  
ini_set('display_errors', 1);

// Conexión a la base de datos
require_once 'conexion.php';

// Establecer que la respuesta será en formato JSON
header('Content-Type: application/json');

// Verificar que los datos estén presentes
if (isset($_POST['id'], $_POST['paciente'], $_POST['descripcion'], $_POST['progreso'])) {
    $id = $_POST['id'];
    $paciente = $_POST['paciente'];
    $descripcion = $_POST['descripcion'];
    $progreso = $_POST['progreso'];

    // Consultar el ID del paciente
    $sql = "SELECT id FROM usuarios WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $paciente);
    $stmt->execute();
    $result = $stmt->get_result();
    $paciente_id = $result->fetch_assoc()['id'];

    // Actualizar el diagnóstico
    $sql = "UPDATE diagnosticos SET paciente_id = ?, descripcion = ?, progreso = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issi", $paciente_id, $descripcion, $progreso, $id);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Diagnóstico actualizado correctamente.']);
    } else {
        echo json_encode(['message' => 'Error al actualizar diagnóstico.', 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['message' => 'Faltan datos.']);
}
?>
