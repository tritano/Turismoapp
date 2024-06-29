<?php
// Conectar con la base de datos y otros ajustes necesarios
// Aquí debes incluir tu lógica para la conexión y configuración de la base de datos

// Recolectar datos del formulario
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$userType = $_POST['user_type'];

// Validar y procesar según el tipo de usuario
switch ($userType) {
    case 'cliente':
        // Procesar datos para cliente
        break;
    case 'empresa':
        // Procesar datos para empresa
        break;
    case 'guia':
        // Procesar datos para guía
        break;
    default:
        // Manejar error si el tipo de usuario no es válido
        http_response_code(400);
        echo "Tipo de usuario inválido. Por favor, selecciona un tipo válido.";
        exit;
}

// Insertar datos en la base de datos (ejemplo básico)
$query = "INSERT INTO usuarios (username, email, password, user_type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssss", $username, $email, $hashedPassword, $userType);

// Hash de la contraseña
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if ($stmt->execute()) {
    http_response_code(200);
    echo "Usuario registrado correctamente.";
} else {
    http_response_code(500);
    echo "Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.";
}

$stmt->close();
$conn->close();
?>
