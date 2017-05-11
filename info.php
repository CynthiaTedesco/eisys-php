<?php
 
$result = fsockopen("www.google.com", 80) ? "Conection OK." : "Conection not OK.";
echo "Connecting to www.google.com:80... $result <br>";

$result = fsockopen("smtp.gmail.com", 465) ? "Conection OK." : "Conection not OK.";
echo "Connecting to smtp.gmail.com:465... $result <br>";

$result = fsockopen("smtp.gmail.com", 587) ? "Conection OK." : "Conection not OK.";
echo "Connecting to smtp.gmail.com:587... $result <br>";

$result = fsockopen("smtp.gmail.com", 25) ? "Conection OK." : "Conection not OK.";
echo "Connecting to smtp.gmail.com:25... $result <br>";

// $result = fsockopen("smtp.live.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to smtp.live.com:25... $result <br>";

// $result = fsockopen("in-v3.mailjet.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to in-v3.mailjet.com:25... $result <br>";

// $result = fsockopen("in-v3.mailjet.com", 587) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to in-v3.mailjet.com:587... $result <br>";

// $result = fsockopen("smtp.mail.me.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to smtp.mail.me.com:25... $result <br>";

// $result = fsockopen("smtp.aim.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to smtp.aim.com:25... $result <br>";

// $result = fsockopen("smtp.aol.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to smtp.aol.com:25... $result <br>";

// $result = fsockopen("smtp.mail.yahoo.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to smtp.mail.yahoo.com:25... $result <br>";

// $result = fsockopen("smtp.office365.com", 25) ? "Conection OK." : "Conection not OK.";
// echo "Connecting to smtp.office365.com:25... $result <br>";

phpinfo();
?>