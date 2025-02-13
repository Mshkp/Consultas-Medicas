<?php
// Conexión a la base de datos
require_once 'conexion.php';

// Establecer que la respuesta será en formato JSON
header('Content-Type: application/json');

// Verificar que el ID esté presente
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    // Eliminar diagnóstico
    $sql = "DELETE FROM diagnosticos WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Diagnóstico eliminado correctamente.']);
    } else {
        echo json_encode(['message' => 'Error al eliminar diagnóstico.', 'error' => $stmt->error]);
    }
} else {
    echo json_encode(['message' => 'Faltan datos.']);
}
?>
