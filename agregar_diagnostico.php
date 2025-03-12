<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'conexion.php'; // Asegura que este archivo tiene la conexión correcta

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Verificar si los datos están presentes
    if (!isset($_POST['paciente'], $_POST['descripcion'], $_POST['progreso'])) {
        echo json_encode(["success" => false, "message" => "Faltan datos obligatorios."]);
        exit;
    }

    $paciente = trim($_POST['paciente']);
    $descripcion = trim($_POST['descripcion']);
    $progreso = trim($_POST['progreso']);

    // Validar que los campos no estén vacíos
    if (empty($paciente) || empty($descripcion) || empty($progreso)) {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
        exit;
    }

    // Buscar el ID del paciente
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE nombre = ?");
    $stmt->bind_param("s", $paciente);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "El paciente no existe."]);
        exit;
    }

    $fila = $resultado->fetch_assoc();
    $paciente_id = $fila['id'];

    // Insertar el diagnóstico
    $stmt = $conn->prepare("INSERT INTO diagnosticos (paciente_id, descripcion, progreso) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $paciente_id, $descripcion, $progreso);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Diagnóstico agregado correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al guardar el diagnóstico."]);
    }

    $stmt->close();
    $conn->close();
}
?>
