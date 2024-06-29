<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Carga PHPMailer desde Composer

// Recoge los datos del formulario
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Inicializa PHPMailer
$mail = new PHPMailer(true);
try {
    // Configura el servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com'; // Cambia a tu servidor SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'tu_email@example.com'; // Cambia a tu dirección de correo electrónico
    $mail->Password = 'tu_contraseña'; // Cambia a tu contraseña de correo electrónico
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Configura remitente y destinatario
    $mail->setFrom($email, $name);
    $mail->addAddress('contacto@turismoapp.com'); // Cambia al correo del destinatario
    $mail->Subject = 'Nuevo mensaje de contacto';
    $mail->Body = "Nombre: $name\nCorreo electrónico: $email\n\nMensaje:\n$message";

    // Envía el correo electrónico
    $mail->send();
    http_response_code(200);
    echo "Mensaje enviado correctamente.";
} catch (Exception $e) {
    http_response_code(500);
    echo "Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde. Detalles del error: {$mail->ErrorInfo}";
}
?>
