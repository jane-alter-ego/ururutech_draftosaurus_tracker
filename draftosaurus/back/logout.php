<?php
// Eliminar cookies caducadas
setcookie("user", "", time() - 3600, "/");

// Cerrar sessión si no se usa
session_start();
session_unset();
session_destroy();

// Redirigir a la página principal
header("Location: ../front/index.php");
exit();
