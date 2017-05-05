<?php
require_once "PHPTelnet.php";

$telnet = new PHPTelnet();
$telnet->show_connect_error=0;

// if the first argument to Connect is blank,
// PHPTelnet will connect to the local host via 127.0.0.1
$result = $telnet->Connect('localhost',80,'','');

switch ($result) {
case 0:
    error_log('TODO OK: 0');
    error_log($result);
    echo $result;
    $telnet->Disconnect();
    break;
case 1:
    echo '[PHP Telnet] Connect failed: Unable to open network connection';
    break;
case 2:
    echo '[PHP Telnet] Connect failed: Unknown host';
    break;
case 3:
    echo '[PHP Telnet] Connect failed: Login failed';
    break;
case 4:
    echo '[PHP Telnet] Connect failed: Your PHP version does not support PHP Telnet';
    break;
}
?>