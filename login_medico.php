<?php
require 'conexion.php'; // Incluye la conexión a la base de datos

session_start(); // Inicia la sesión

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cedula = $_POST['cedula'];
    $password = $_POST['password'];

    // Consultar al médico con la cédula proporcionada
    $sql = "SELECT id, password FROM medicos WHERE cedula = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        // Credenciales correctas, iniciar sesión
        $_SESSION['medico_id'] = $id;
        echo json_encode(["success" => "Inicio de sesión exitoso"]);
    } else {
        echo json_encode(["error" => "Cédula o contraseña incorrectos"]);
    }

    $stmt->close();
    $conn->close();
}
?>
