<?php
$servername = "localhost";
$username = "root"; // Usuario por defecto de XAMPP
$db_password = ""; // Contraseña vacía por defecto
$dbname = "DRAFTOSAURUS";

try {
    // Crear conexión
    $conn = new mysqli($servername, $username, $db_password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        throw new Exception("Conexión fallida: " . $conn->connect_error);
    }

    // Obtener datos del formulario
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Buscar usuario en la base de datos por email
    $sql = "SELECT * FROM USERS WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar existencia y contraseña
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verificar el hash de la contraseña
        if (password_verify($password, $user['password'])) {
            setcookie("user", $email, time() + (86400 * 30), "/");
            header("Location: ../front/index.php?action=profile");
        } else {
            header("Location: ../front/rechazo.php");
        }
    } else {
        header("Location: ../front/rechazo.php");
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    error_log("../back/login.php: " . $e->getMessage());
    header("Location: ../front/rechazo.php");
}

exit();
?>