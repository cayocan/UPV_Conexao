
package com.upv.integra.service;

import java.io.IOException;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.upv.integra.model.IntegraLogin;

@Component
public class EmailServiceImpl {
	
	private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
  
    @Autowired
    public JavaMailSender mailSender;
    @Autowired
    public SimpleMailMessage template;
 
    public boolean sendMail(IntegraLogin user, String password) {
    	logger.info(user.toString()+" - "+password);
        try {
        	InternetAddress from = new InternetAddress("integra@unidospelavida.org.br", "Atendimento Integra FC");
        	String message = template.getText();
        	message = message.replace("${NAME}",user.getName());
        	message = message.replace("${PASSWORD}",password);
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail);
            helper.setTo(user.getUsername());
            helper.setSubject("Solicitação de Nova Senha - Integra FC");
            helper.setText(message, true);
            helper.setFrom(from);
            mailSender.send(mail);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    @Bean
    public SimpleMailMessage templateSimpleMessage() throws IOException {
        SimpleMailMessage message = new SimpleMailMessage();
//        ResourceUtils.getURL("classpath:application.properties")
//		  String template = new String(Files.readAllBytes(Paths.get("template_reset_password.html")), StandardCharsets.UTF_8);
//        String template = Files.readAllBytes(ResourceUtils.getFile("classpath:template_reset_password.html"));
//        message.setText(template);
        
//        String template = new String(Files.readAllBytes(Paths.get(getClass().getResource("/template_reset_password.html").getPath())));
//        message.setText(template);
        message.setText(
        		"<div style=\"background-color: #ffffff;\">\r\n" + 
        		"    <div style=\"max-width: 600px; background-color: #ffffff; margin: 0 auto;\">\r\n" + 
        		"        <div style=\"background-color: #ffffff; "+ 
//        		"+background-image: radial-gradient(#630D8C, #22044C); "+ 
        		"text-align: center; vertical-align: middle; padding: 30px;\">\r\n" + 
        		"            <img src=\"http://integrafc.org.br/static/media/LogoIntegra.5e05b243.png\" height=\"130\">\r\n" + 
        		"        </div>\r\n" + 
        		"        <div id=\"msg\" style=\"padding:50px 20% 10% 20%; color:#000000;\">\r\n" + 
        		"            <p>Olá ${NAME},</p>\r\n" + 
        		"            <p>Recebemos seu pedido de nova de senha do <b>Integra FC</b>.</p>\r\n" + 
        		"        		<p>Abaixo segue a sua senha provisória:</p>\r\n" + 
        		"        		<h2 style=\"text-align: center; color:#000000\"><strong>${PASSWORD}</strong></h2>\r\n" + 
        		"        		<p>Faça login no <b>Integra FC</b> usando esta senha e a seguir troque por uma senha de sua escolha.</p>\r\n" + 
        		"                <p>Se você não pediu redefinição de senha, <a href=\"mailto:integra@unidospelavida.org.br\" style=\"text-decoration:underline; color:#929191\"> entre em contato conosco.</a></p>\r\n" + 
        		"         		<p>Atenciosamente,</p>\r\n" + 
        		"        		<p>Equipe Integra FC</p>\r\n" + 
        		"        </div>\r\n" + 
        		"        <div id=\"rodape\" style=\"background-color: #ffffff; "+ 
//        		"background-image: radial-gradient(#630D8C, #22044C);"+ 
        		"text-align: center; padding-top: 20px; padding-bottom: 20px;\">\r\n" + 
        		"            <div id=\"icons\">\r\n" + 
//				"              <a href=\"https://www.facebook.com/playeducadisney/\" target=\"_blank\"><img src=\"http://672666896.origin.worldcdn.net/email/ico-email-facebook.png\" style=\"margin: 15px;\"></a>\r\n" + 
//				"              <a href=\"https://www.instagram.com/playeducadisney/\" target=\"_blank\"><img src=\"http://672666896.origin.worldcdn.net/email/ico-email-instagram.png\" style=\"margin: 15px;\"></a>\r\n" +
//				"              <a href=\"https://www.youtube.com/channel/UCF0DPG3a73Ws9CKwpsPynmA?view_as=subscriber\" target=\"_blank\"><img src=\"http://672666896.origin.worldcdn.net/email/ico-email-youtube.png\" style=\"margin: 15px;\"></a>\r\n" + 
        		"            </div>\r\n" + 
        		"            <div id=\"textoRodape\" style=\"color:black; font-size: 12px;\">\r\n" + 
        		"                <p>Copyright &#9400; 2020 Unidos Pela Vida, Inc. All rights reserved.</p>\r\n" + 
// 				"                <p>Pixar properties &#9400; Disney/Pixar</p>\r\n" + 
        		"            </div>\r\n" + 
        		"        </div>\r\n" + 
        		"    </div>\r\n" + 
        		"</div>");
        return message;
    }
    
}