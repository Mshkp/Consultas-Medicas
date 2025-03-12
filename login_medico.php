<?php
session_start();
include("conexion.php"); // Asegúrate de que este archivo conecta a la base de datos correctamente

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST["cedula"]) || !preg_match("/^[0-9]+$/", $_POST["cedula"])) {
        die("Error: La cédula solo debe contener números.");
    }

    $cedula = $_POST["cedula"];

    // Preparar la consulta a la base de datos
    $query = "SELECT * FROM medicos WHERE cedula = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $_SESSION["medico"] = $cedula;
        header("Location: lobby_medico.php"); // Redirige al lobby si la cédula existe
        exit();
    } else {
        echo "Cédula no registrada.";
    }

    $stmt->close();
    $conn->close();
}
?>
