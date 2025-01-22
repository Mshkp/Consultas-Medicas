<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['error' => 'Todos los campos son obligatorios.']);
        exit;
    }

    $query = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $query->bind_param('s', $email);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows == 0) {
        echo json_encode(['error' => 'Usuario no encontrado.']);
        exit;
    }

    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(['success' => 'Inicio de sesión exitoso.']);
    } else {
        echo json_encode(['error' => 'Contraseña incorrecta.']);
    }
}
?>
