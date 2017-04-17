<?php 
require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->IsSMTP(); // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup server
$mail->SMTPAuth = true; // Enable SMTP authentication
$mail->Username = 'eisys.sender@gmail.com'; // SMTP username
$mail->Password = 'eisyssysie'; // SMTP password
$mail->SMTPDebug = 0; // debugging: 0 = nothing, 1 = errors and messages, 2 = messages only
$mail->SMTPort = 587; // 587 or 465
$mail->SMTPSecure = 'tls'; // Enable encryption, 'ssl' also accepted

$mail->CharSet = 'UTF-8';
$mail->From = 'eisys.sender@gmail.com';
$mail->FromName = 'Eisys Web';
$mail->AddAddress('escribinos@eisys.com.ar'); // Name is optional
$mail->IsHTML(true); // Set email format to HTML

$name = $_POST['name'];
$email = $_POST['email'];
$company = getPostedValue($_POST, 'company');
$position = getPostedValue($_POST, 'position');
$phone = getPostedValue($_POST, 'phone');
$cellphone = getPostedValue($_POST, 'cellphone');
$comment = $_POST['message'];
$subject = $_POST['subject'];

$message = '<html><body style="line-height: 1.5em;">';
$message .= '<p>Has recibido un nuevo mensaje de ' . makeLabel($name) . ':</p>';
$message .= '<ul>';
$message .= '<li><span><strong>Nombre:</strong> </span><span>' . makeLabel($name) . '</span></li>';
$message .= $company ? '<li><span><strong>Empresa:</strong> </span><span>' . makeLabel($company) . '</span></li>' : '';
$message .= $position ? '<li><span><strong>Cargo:</strong> </span><span>' . makeLabel($position) . '</span></li>' : '';
$message .= $phone ? '<li><span><strong>Teléfono fijo:</strong> </span><span>' . makeLabel($phone) . '</span></li>' : '';
$message .= $cellphone ? '<li><span><strong>Teléfono móvil:</strong> </span><span>' . makeLabel($cellphone) . '</span></li>' : '';
$message .= '<li><span><strong>Email:</strong> </span><span>' . makeLabel($email) . '</span></li>';
$message .= '</ul>';
$message .= '<strong><span>Mensaje:</span></strong>';
$message .= '<ul style="list-style:none"><li><span>' . $comment . '</span></li></ul>';

$message .= '</body></html>';

$mail->Subject = $subject;
$mail->Body    = $message;
$mail->AltBody = '<p>Se ha recibido un nuevo mensaje desde la Web de Eisys</p>';

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