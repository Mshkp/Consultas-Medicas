<?php
require 'conexion.php'; // Incluye la conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre = trim($_POST['nombre']);
    $apellidos = trim($_POST['apellidos']);
    $email = trim($_POST['email']);
    $cedula = trim($_POST['cedula']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashear la contraseña

    // Verificar si ya existe un médico con la misma cédula
    $sql_check = "SELECT * FROM medicos WHERE cedula = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $cedula);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        echo json_encode(["error" => "La cédula ya está registrada"]);
    } else {
        // SQL para insertar el médico
        $sql = "INSERT INTO medicos (nombre, apellidos, email, cedula, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $nombre, $apellidos, $email, $cedula, $password);

        if ($stmt->execute()) {
            echo json_encode(["success" => "Médico registrado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al registrar médico"]);
        }
        $stmt->close();
    }

    $stmt_check->close();
    $conn->close();
}
?>
