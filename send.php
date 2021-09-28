<?php
$full_name = $_POST['name'];
$your_email = $_POST['email'];
$your_message = $_POST['message'];
$messageHTML = "Imię i nazwisko : ".$full_name."<br> Email : ".$your_email. "<br> Wiadomość : ".$your_message. "<br>";
$messageAlt = "Imię i nazwisko : ".$full_name."\n Email : ".$your_email. "\n Wiadomość : ".$your_message. "\n";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 2;
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'smtp.mailtrap.io';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'd882e29ab672a9';
    $mail->Password   = '947888c60ae876';
    $mail->Port       = 2525;

    //Recipients
    $mail->setFrom('johndoe@example.com', 'Mailer');
    $mail->addAddress('johndoe@example.com', 'Joe User');
    $mail->addAddress('johndoe@example.com');
    $mail->addReplyTo('johndoe@example.com', 'Informacje');

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Wiadomość z formularza kontaktowego';
    $mail->Body = $messageHTML;
    $mail->AltBody = $messageAlt;

    $mail->send();
    echo 'Wiadomość została wysłana!';
} catch (Exception $e) {
    echo "Wiadomość nie mogła zostać wysłana. Błąd: {$mail->ErrorInfo}";
}
