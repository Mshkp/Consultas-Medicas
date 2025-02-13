<?php
// Iniciar la sesión
session_start();

// Verificar que el usuario está autenticado como médico
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'medico') {
    echo json_encode(['error' => 'Acceso no autorizado.']);
    exit;
}

// Conexión a la base de datos
$host = 'localhost'; // Cambia si tu servidor tiene otro host
$db = 'consultas';
$user = 'root'; // Cambia si tu usuario de base de datos es diferente
$password = ''; // Cambia si tienes una contraseña

// Crear conexión
$conn = new mysqli($host, $user, $password, $db);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Consultar diagnósticos de los pacientes del médico autenticado
$doctor_id = $_SESSION['user_id']; // Obtener el ID del médico desde la sesión

$sql = "
    SELECT 
        d.id, 
        u.name AS paciente, 
        CONCAT(m.nombre, ' ', m.apellidos) AS medico,
        d.descripcion,
        d.progreso,
        d.fecha_inicio,
        d.fecha_fin
    FROM 
        diagnosticos d
    JOIN 
        usuarios u ON d.paciente_id = u.id
    JOIN 
        medicos m ON d.doctor_id = m.id
    WHERE 
        d.doctor_id = ?
";

// Preparar la consulta
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $doctor_id); // Vincular el parámetro de doctor_id
$stmt->execute();
$result = $stmt->get_result();

// Recuperar los resultados
$diagnosticos = [];
while ($row = $result->fetch_assoc()) {
    $diagnosticos[] = $row;
}

// Cerrar la conexión
$stmt->close();
$conn->close();

// Devolver los resultados como JSON
echo json_encode($diagnosticos);
?>
