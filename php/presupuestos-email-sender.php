<?php 
require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';
set_time_limit(0);

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
$mail->AddAddress('valecardozo@lexar.com.ar', 'Lexar'); // Name is optional
$mail->IsHTML(true); // Set email format to HTML
//$mail->AddCC('cc@example.com');
//$mail->AddBCC('bcc@example.com');

$mail->WordWrap = 90; // Set word wrap to 90 characters

$uploads_path = '../tmp/';
$uploads = scandir($uploads_path);
foreach ($uploads as &$filename) {
	if ($filename != '.' && $filename != '..' && $filename != '.gitignore'){
		$mail->AddAttachment($uploads_path . $filename);
	}
}

$name = $_POST['nombre'];
$email = $_POST['email'];
$tel_fijo = getPostedValue($_POST, 'tel_fijo');
$tel_movil = getPostedValue($_POST, 'tel_movil');
$tipo = $_POST['tipo'];
$subject = $_POST['subject'];

$message = '<html><body style="line-height: 1.5em;">';
$message .= '<p>Se ha solicitado un presupuesto del tipo <strong>'.getServiceTypeName($tipo).'.</strong></p>';
$message .= '<p>Información de contacto:</p>';
$message .= '<ul>';
$message .= "<li><span><strong>Nombre:</strong> </span><span>" . makeLabel($name) . "</span></li>";
$message .= "<li><span><strong>Email:</strong> </span><span>" . makeLabel($email) . "</span></li>";
$message .= $tel_fijo ? "<li><span><strong>Teléfono fijo:</strong> </span><span>" . makeLabel($tel_fijo) . "</span></li>" : "";
$message .= $tel_movil ? "<li><span><strong>Teléfono móvil:</strong> </span><span>" . makeLabel($tel_movil) . "</span></li>" : "";
$message .= '</ul>';
$message .= '<span>Detalles:</span>';
$message .= '<ul>';

if (esTraduccion($tipo)){
	$origen = getPostedValue($_POST, 'idioma_origen');
	$destino = getPostedValue($_POST, 'idioma_llegada');
	$publica = getPostedValue($_POST, 'es_publica');

	$message .= "<li><span><strong>Idioma de origen:</strong> </span><span>" . makeLabel($origen) . "</span></li>";
	$message .= "<li><span><strong>Idioma de llegada:</strong> </span><span>" . makeLabel($destino) . "</span></li>";
	$message .= "<li><span><strong>¿Es una traducción pública?:</strong> </span><span>" . makeLabel($publica) . "</span></li>";

	$cantidad_palabras = getPostedValue($_POST, 'cantidad_palabras');
	$plazo_entrega = getPostedValue($_POST, 'plazo_entrega');
	$formato_entrega = getPostedValue($_POST, 'formato_entrega');
	$comentarios = getPostedValue($_POST, 'comentarios');

	$message .= $cantidad_palabras ? "<li><span><strong>Cantidad de palabras u hojas:</strong> </span><span>" . makeLabel($cantidad_palabras) . "</span></li>" : "";
	$message .= $plazo_entrega ? "<li><span><strong>Plazo de entrega:</strong> </span><span>" . makeLabel($plazo_entrega) . "</span></li>" : "";
	$message .= $formato_entrega ? "<li><span><strong>Formato de entrega:</strong> </span><span>" . makeLabel($formato_entrega) . "</span></li>" : "";
	$message .= $comentarios ? "<li><span><strong>Comentarios:</strong> </span><span>" . makeLabel($comentarios) . "</span></li>" : "";

} else if (esInterpretacion($tipo)){
	$origen = getPostedValue($_POST, 'idioma_origen');
	$destino = getPostedValue($_POST, 'idioma_llegada');
	$fecha_interpretacion = getPostedValue($_POST, 'fecha_interpretacion');
	$tipo_interpretacion = getPostedValue($_POST, 'tipo_interpretacion');
	$horas_interpretacion = getPostedValue($_POST, 'horas_interpretacion');
	$lugar_interpretacion = getPostedValue($_POST, 'lugar_interpretacion');

	$message .= "<li><span><strong>Idioma de origen:</strong> </span><span>" . makeLabel($origen) . "</span></li>";
	$message .= "<li><span><strong>Idioma de llegada:</strong> </span><span>" . makeLabel($destino) . "</span></li>";
	$message .= "<li><span><strong>Fecha de la interpretación:</strong> </span><span>" . makeLabel($fecha_interpretacion) . "</span></li>";
	$message .= "<li><span><strong>Tipo de interpretación:</strong> </span><span>" . makeLabel($tipo_interpretacion) . "</span></li>";
	$message .= "<li><span><strong>Horas de interpretación:</strong> </span><span>" . makeLabel($horas_interpretacion) . "</span></li>";
	$message .= "<li><span><strong>Lugar de la interpretación:</strong> </span><span>" . makeLabel($lugar_interpretacion) . "</span></li>";

	$etiqueta = getPostedValue($_POST, 'etiqueta');
	$comentarios = getPostedValue($_POST, 'comentarios');

	$message .= $etiqueta ? "<li><span><strong>Etiqueta:</strong> </span><span>" . makeLabel($etiqueta) . "</span></li>" : "";
	$message .= $comentarios ? "<li><span><strong>Comentarios:</strong> </span><span>" . makeLabel($comentarios) . "</span></li>" : "";

} else if (esCorreccion($tipo)){

	$idioma = getPostedValue($_POST, 'idioma');
	$tipo_correccion = getPostedValue($_POST, 'tipo_correccion');
	$formato = getPostedValue($_POST, 'formato');
	$plazo_entrega = getPostedValue($_POST, 'plazo_entrega');

	$message .= "<li><span><strong>Idioma:</strong> </span><span>" . makeLabel($idioma) . "</span></li>";
	$message .= "<li><span><strong>Tipo de corrección:</strong> </span><span>" . makeLabel($tipo_correccion) . "</span></li>";
	$message .= "<li><span><strong>Formato del documento:</strong> </span><span>" . makeLabel($formato) . "</span></li>";
	$message .= "<li><span><strong>Plazo de entrega:</strong> </span><span>" . makeLabel($plazo_entrega) . "</span></li>";

	$cantidad = getPostedValue($_POST, 'cantidad');
	$comentarios = getPostedValue($_POST, 'comentarios');

	$message .= $cantidad ? "<li><span><strong>Cantidad de palabras, hojas o matices:</strong> </span><span>" . makeLabel($cantidad) . "</span></li>" : "";
	$message .= $comentarios ? "<li><span><strong>Comentarios:</strong> </span><span>" . makeLabel($comentarios) . "</span></li>" : "";

} else if (esSubtitulado($tipo)){
	
	$idioma = getPostedValue($_POST, 'idioma');
	$doblaje_o_subt = getPostedValue($_POST, 'doblaje_o_subt');
	$duracion = getPostedValue($_POST, 'duracion');
	$formato = getPostedValue($_POST, 'formato');
	$plazo_entrega = getPostedValue($_POST, 'plazo_entrega');

	$message .= "<li><span><strong>Idioma:</strong> </span><span>" . makeLabel($idioma) . "</span></li>";
	$message .= "<li><span><strong>¿Doblaje o subtitulado?:</strong> </span><span>" . makeLabel($doblaje_o_subt) . "</span></li>";
	$message .= "<li><span><strong>Duración del video:</strong> </span><span>" . makeLabel($duracion) . "</span></li>";
	$message .= "<li><span><strong>Formato de entrega:</strong> </span><span>" . makeLabel($formato) . "</span></li>";
	$message .= "<li><span><strong>Plazo de entrega:</strong> </span><span>" . makeLabel($plazo_entrega) . "</span></li>";

	$cantidad = getPostedValue($_POST, 'cantidad');
	$sincronizacion = getPostedValue($_POST, 'sincronizacion');
	$temporizacion = getPostedValue($_POST, 'temporizacion');
	$comentarios = getPostedValue($_POST, 'comentarios');

	$message .= $cantidad ? "<li><span><strong>Cantidad de palabras (guión escrito):</strong> </span><span>" . makeLabel($cantidad) . "</span></li>" : "";
	$message .= $sincronizacion ? "<li><span><strong>Sincronización:</strong> </span><span>" . makeLabel($sincronizacion) . "</span></li>" : "";
	$message .= $temporizacion ? "<li><span><strong>Temporización:</strong> </span><span>" . makeLabel($temporizacion) . "</span></li>" : "";
	$message .= $comentarios ? "<li><span><strong>Comentarios:</strong> </span><span>" . makeLabel($comentarios) . "</span></li>" : "";
}

$message .= '</ul><br/><br/><img src="cid:logo" alt="Lexar Web" />';
$message .= '</body></html>';

$mail->Subject = $subject;
$mail->Body    = $message;
$mail->AddEmbeddedImage('../images/header/header-logo-lexar.png', 'logo');
$mail->AltBody = '<p>Se ha solicitado un presupuesto del tipo <strong>'.getServiceTypeName($tipo).'</strong></p>';

if(!$mail->Send()) {
   echo 'Message could not be sent.';
   echo 'Mailer Error: ' . $mail->ErrorInfo;
   exit;
}

echo 'Message has been sent :)';

function esTraduccion($tipo){
	return $tipo == 'Traduccion';
}
function esInterpretacion($tipo){
	return $tipo == 'Interpretacion';
}
function esCorreccion($tipo){
	return $tipo == 'Correccion';
}
function esSubtitulado($tipo){
	return $tipo == 'Subtitulado';
}

function getServiceTypeName($tipo){
	if (esTraduccion($tipo)){
		return 'TRADUCCIÓN';
	} else if (esInterpretacion($tipo)){
		return 'INTERPRETACIÓN';
	} else if (esCorreccion($tipo)){
		return 'CORRECCIÓN';
	} else if (esSubtitulado($tipo)){
		return 'SUBTITULADO Y DOBLAJE';
	}
}

function makeLabel($text){
	$label = '<label>'. $text .'</label>';
	return $label;
}

function getPostedValue($array, $value){
	return isset($array[$value]) ? $array[$value] : '';
}
?>