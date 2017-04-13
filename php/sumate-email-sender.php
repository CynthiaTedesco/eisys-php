<?php 
require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->IsSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup server
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'lexartd@gmail.com'; // SMTP username
$mail->Password = 'lexarraxel'; // SMTP password
$mail->SMTPDebug = 0; // debugging: 0 = nothing, 1 = errors and messages, 2 = messages only
$mail->SMTPort = 587; // 465 or 587
$mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted

$mail->CharSet = 'UTF-8';
$mail->From = 'lexartd@gmail.com';
$mail->FromName = 'Lexar Web';
$mail->AddAddress('sumate@lexar.com.ar', 'Lexar'); // Name is optional
$mail->IsHTML(true); // Set email format to HTML

$mail->WordWrap = 90; // Set word wrap to 90 characters

$uploads_path = '../tmp/';
$uploads = scandir($uploads_path);
foreach ($uploads as &$filename) {
	if ($filename != '.' && $filename != '..' && $filename != '.gitignore'){
		$mail->AddAttachment($uploads_path . $filename);
	}
}

$mail->AddEmbeddedImage('../images/header/header-logo-lexar.png', 'logo');

$name = $_POST['nombre'];
$email = $_POST['email'];
$tel_fijo = getPostedValue($_POST, 'tel_fijo');
$tel_movil = getPostedValue($_POST, 'tel_movil');
$idiomas = getPostedValue($_POST, 'idiomas');
$especializacion = getPostedValue($_POST, 'especializacion');
$profesion = getPostedValue($_POST, 'profesion');
$comment = getPostedValue($_POST, 'mensaje');
$subject = $_POST['subject'];

$message = '<html><body style="line-height: 1.5em;">';
$message .= '<p>Se ha recibido un nuevo mensaje de alguien que quiere sumarse al equipo de Lexar.</p>';
$message .= '<p>Información de contacto:</p>';
$message .= '<ul>';
$message .= "<li><span><strong>Name:</strong> </span><span>" . makeLabel($name) . "</span></li>";
$message .= "<li><span><strong>Email:</strong> </span><span>" . makeLabel($email) . "</span></li>";
$message .= $tel_fijo ? "<li><span><strong>Teléfono fijo:</strong> </span><span>" . makeLabel($tel_fijo) . "</span></li>" : "";
$message .= $tel_movil ? "<li><span><strong>Teléfono móvil:</strong> </span><span>" . makeLabel($tel_movil) . "</span></li>" : "";
$message .= '</ul>';
$message .= $profesion || $especializacion || $idiomas || $comment ? "<span>Detalles:</span>" : "";
$message .= '<ul>';

$message .= $profesion ? "<li><span><strong>Profesión:</strong> </span><span>" . makeLabel($profesion) . "</span></li>" : "";
$message .= $especializacion ? "<li><span><strong>Áreas de especialización:</strong> </span><span>" . makeLabel($especializacion) . "</span></li>" : "";
$message .= $idiomas ? "<li><span><strong>Idiomas de trabajo:</strong> </span><span>" . makeLabel($idiomas) . "</span></li>" : "";
$message .= $comment ? "<li><span><strong>Mensaje:</strong> </span><span>" . makeLabel($comment) . "</span></li>" : "";
$message .="</ul>";
$message .= '<br/><br/><img src="cid:logo" alt="Lexar Web" />';
$message .= '</body></html>';

$mail->Subject = $subject;
$mail->Body    = $message;
$mail->AltBody = '<p>Se ha recibido un nuevo mensaje de alguien que quiere sumarse al equipo de Lexar</p>';

if(!$mail->Send()) {
   echo 'Message could not be sent.';
   echo 'Mailer Error: ' . $mail->ErrorInfo;
   exit;
}

echo 'Message has been sent :)';

function makeLabel($text){
	$label = '<label>'. $text .'</label>';
	return $label;
}

function getPostedValue($array, $value){
	return isset($array[$value]) ? $array[$value] : '';
}
?>