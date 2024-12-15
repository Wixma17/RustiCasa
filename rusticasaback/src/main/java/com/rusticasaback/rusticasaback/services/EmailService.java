package com.rusticasaback.rusticasaback.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail,                               
                                String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Recuperación Correo");
        message.setText("Hola Buenas tu contraseña es la siguiente: '"+body+"' no se te olvide apuntarlo en algun lado seguro y no lo compartas");
        message.setFrom("rusticasa066@gmail.com");

        mailSender.send(message);
    }

    public void sendAcceptEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Recuperación Correo");
        message.setText("Hola Buenas tu solicitud sobre la casa ha sido aceptada");
        message.setFrom("rusticasa066@gmail.com");

        mailSender.send(message);
    }

    public void sendDeniedEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Recuperación Correo");
        message.setText("Hola Buenas tu solicitud sobre la casa ha sido cancelada");
        message.setFrom("rusticasa066@gmail.com");

        mailSender.send(message);
    }
}
