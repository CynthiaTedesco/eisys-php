<?php
/*
PHPTelnet 1.1.1
by Antone Roundy
adapted from code found on the PHP website
public domain
*/

class PHPTelnet {
	var $show_connect_error=1;

	var $use_usleep=0;	// change to 1 for faster execution
		// don't change to 1 on Windows servers unless you have PHP 5
	var $sleeptime=125000;
	var $loginsleeptime=1000000;

	var $fp=NULL;
	var $loginprompt;

	var $conn1;
	var $conn2;
	
	/*
	0 = success
	1 = couldn't open network connection
	2 = unknown host
	3 = login failed
	4 = PHP version too low
	*/
	function Connect($server,$port,$user,$pass) {
		$rv=0;
		$vers=explode('.',PHP_VERSION);
		$needvers=array(4,3,0);
		$j=count($vers);
		$k=count($needvers);
		if ($k<$j) $j=$k;
		for ($i=0;$i<$j;$i++) {
			if (($vers[$i]+0)>$needvers[$i]) break;
			if (($vers[$i]+0)<$needvers[$i]) {
				$this->ConnectError(4);
				return 4;
			}
		}
        
        if (!$port){
            $port = 80;
        }
		
		$this->Disconnect();
		
		if (strlen($server)) {
			if (preg_match('/[^0-9.]/',$server)) {
				$ip=gethostbyname($server);
                error_log('server = ');
                error_log($server);
                error_log('ip = ');
                error_log($ip);
                error_log('port = ');
                error_log($port);
				if ($ip==$server) {
					$ip='';
					$rv=2;
				}
			} else $ip=$server;
		} else $ip='127.0.0.1';
		
		if (strlen($ip)) {
			if ($this->fp=fsockopen($ip,$port)) {
                error_log('line 59. this->fp has something');
				fputs($this->fp,$this->conn1);
				$this->Sleep();
				
				fputs($this->fp,$this->conn2);
				$this->Sleep();
                
                if (strcmp($server,'localhost')!==0){
                    error_log('CALLING GETRESPONSE FROM LINE 65');
                    $this->GetResponse($r);
                    $r=explode("\n",$r);
                    $this->loginprompt=$r[count($r)-1];
                    error_log(print_r($r, TRUE));
                } else {
                    error_log('Success connection to localhost');
                }
			} else $rv=1;
		}
		
		if ($rv) {
            $this->ConnectError($rv);
        } else if (strcmp($server,'localhost')!==0){
                return print_r($r, TRUE);
        }
        
		return $rv;
	}
	
	function Disconnect($exit=1) {
		if ($this->fp) {
//			if ($exit) $this->DoCommand('exit',$junk);
			fclose($this->fp);
			$this->fp=NULL;
		}
	}

	function DoCommand($c,&$r) {
		if ($this->fp) {
			fputs($this->fp,"$c\r");
			$this->Sleep();
            error_log('CALLING GETRESPONSE FROM LINE 103');
			$this->GetResponse($r);
			$r=preg_replace("/^.*?\n(.*)\n[^\n]*$/","$1",$r);
		}
		return $this->fp?1:0;
	}
	
	function GetResponse(&$r) {
        error_log('INSIDE GETRESPONSE. $r = ');
        error_log(print_r($r, TRUE));
		$r='';
		do { 
			$r.=fread($this->fp,1000);
			$s=socket_get_status($this->fp);
		} while ($s['unread_bytes']);
        error_log('while loop of getResponse: finished. $r = ');
        error_log(print_r($r, TRUE));
	}
	
	function Sleep() {
		if ($this->use_usleep) usleep($this->sleeptime);
		else sleep(1);
	}
	
	function PHPTelnet() {
		$this->conn1=chr(0xFF).chr(0xFB).chr(0x1F).chr(0xFF).chr(0xFB).
			chr(0x20).chr(0xFF).chr(0xFB).chr(0x18).chr(0xFF).chr(0xFB).
			chr(0x27).chr(0xFF).chr(0xFD).chr(0x01).chr(0xFF).chr(0xFB).
			chr(0x03).chr(0xFF).chr(0xFD).chr(0x03).chr(0xFF).chr(0xFC).
			chr(0x23).chr(0xFF).chr(0xFC).chr(0x24).chr(0xFF).chr(0xFA).
			chr(0x1F).chr(0x00).chr(0x50).chr(0x00).chr(0x18).chr(0xFF).
			chr(0xF0).chr(0xFF).chr(0xFA).chr(0x20).chr(0x00).chr(0x33).
			chr(0x38).chr(0x34).chr(0x30).chr(0x30).chr(0x2C).chr(0x33).
			chr(0x38).chr(0x34).chr(0x30).chr(0x30).chr(0xFF).chr(0xF0).
			chr(0xFF).chr(0xFA).chr(0x27).chr(0x00).chr(0xFF).chr(0xF0).
			chr(0xFF).chr(0xFA).chr(0x18).chr(0x00).chr(0x58).chr(0x54).
			chr(0x45).chr(0x52).chr(0x4D).chr(0xFF).chr(0xF0);
		$this->conn2=chr(0xFF).chr(0xFC).chr(0x01).chr(0xFF).chr(0xFC).
			chr(0x22).chr(0xFF).chr(0xFE).chr(0x05).chr(0xFF).chr(0xFC).chr(0x21);
	}
	
	function ConnectError($num) {
		if ($this->show_connect_error) switch ($num) {
		case 1: echo '<br />[PHP Telnet] <a href="http://www.geckotribe.com/php-telnet/errors/fsockopen.php">Connect failed: Unable to open network connection</a><br />'; break;
		case 2: echo '<br />[PHP Telnet] <a href="http://www.geckotribe.com/php-telnet/errors/unknown-host.php">Connect failed: Unknown host</a><br />'; break;
		case 3: echo '<br />[PHP Telnet] <a href="http://www.geckotribe.com/php-telnet/errors/login.php">Connect failed: Login failed</a><br />'; break;
		case 4: echo '<br />[PHP Telnet] <a href="http://www.geckotribe.com/php-telnet/errors/php-version.php">Connect failed: Your server\'s PHP version is too low for PHP Telnet</a><br />'; break;
		}
	}
}

return;
?>
