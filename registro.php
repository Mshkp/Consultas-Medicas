<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['error' => 'Todos los campos son obligatorios.']);
        exit;
    }

    // Validar si el usuario ya existe
    $query = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['error' => 'Este correo ya está registrado.']);
        exit;
    }

    // Insertar nuevo usuario
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $insert = $conn->prepare("INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)");
    $insert->bind_param('sss', $name, $email, $hashed_password);

    if ($insert->execute()) {
        echo json_encode(['success' => 'Registro exitoso.']);
    } else {
        echo json_encode(['error' => 'Error al registrar el usuario.']);
    }
}
?>
