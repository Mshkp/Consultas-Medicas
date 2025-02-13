// Iniciar sesión si aún no está iniciada
session_start();

// Conexión a la base de datos
require_once 'conexion.php';

// Verificar si los datos están presentes
if (isset($_POST['paciente'], $_POST['descripcion'], $_POST['progreso'])) {
    $paciente = $_POST['paciente'];
    $descripcion = $_POST['descripcion'];
    $progreso = $_POST['progreso'];

    // Verificar si el paciente existe en la base de datos
    $sql = "SELECT id FROM usuarios WHERE name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $paciente);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 0) {
        echo json_encode(['message' => 'El paciente no existe en la base de datos.']);
        exit;
    }
    
    $paciente_id = $result->fetch_assoc()['id'];

    // Verificar si el doctor está autenticado
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['message' => 'No se pudo obtener el ID del doctor.']);
        exit;
    }
    
    $doctor_id = $_SESSION['user_id'];

    // Insertar nuevo diagnóstico en la base de datos
    $sql = "INSERT INTO diagnosticos (paciente_id, descripcion, progreso, doctor_id) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issi", $paciente_id, $descripcion, $progreso, $doctor_id);
    
    if ($stmt->execute()) {
        echo json_encode(['message' => 'Diagnóstico agregado correctamente.']);
    } else {
        echo json_encode(['message' => 'Error al agregar diagnóstico.']);
    }
} else {
    echo json_encode(['message' => 'Faltan datos necesarios.']);
}
