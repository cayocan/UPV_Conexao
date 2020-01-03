package com.upv.integra.service;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.upv.integra.controller.AuthController;
import com.upv.integra.model.IntegraLogin;
import com.upv.integra.model.dto.IntegraLoginDTO;
import com.upv.integra.repository.IntegraLoginRepository;

@Service
public class IntegraLoginService {
	
	private static final Logger logger = LoggerFactory.getLogger(IntegraLoginService.class);
	@Autowired private IntegraLoginRepository userLoginRepository;
	@Autowired private EmailServiceImpl emailService;
	
//	public Boolean createLogin(IntegraLoginDTO userDTO) {
//		IntegraLogin user = new IntegraLogin();
//		user.setId(userDTO.getPersonId());
//		user.setPassword(passwordEncoder().encode(userDTO.getPassword()));
////		user.setPassword(userDTO.getPassword());
//		user.setUsername(userDTO.getUsername());
//		user.setName(userDTO.getName());
//		user.setResetPassword(false); /* ALTERAR QUANDO FOR CRIAR O PAGAMENTO */
//		try {
//			user.setRole(roleRepository.findByName("USER"));
//			userLoginRepository.save(user);
//		}catch (Exception e) {
//			System.out.println(e.getMessage());
//			return false;
//		}
//		return true;
//	}
	
	public Boolean resetaPassword(String email) {
		
		try {
			IntegraLogin reset = userLoginRepository.findByUsername(email);
			if(reset==null) {
				logger.info("Email não encontrado.");
			}
			logger.info("IntegraLogin: "+reset.toString());
			String newPassword = generateRandomPassword();
			String oldPassword = reset.getPassword();
//			reset.setPassword(newPassword);
			reset.setPassword(passwordEncoder().encode(newPassword));
			reset.setResetPassword(true);
			logger.info("PreSave: "+reset.toString());
			reset = userLoginRepository.save(reset);
			
			if(emailService.sendMail(reset, newPassword)) {
				return true;
			}else {
				reset.setPassword(oldPassword);
				reset.setResetPassword(false);
				reset = userLoginRepository.save(reset);
				return false;
			}
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		
	}
	
	
	public Boolean changePassword(IntegraLoginDTO newPassword) {
			
			try {
				IntegraLogin reset = userLoginRepository.findByUsername(newPassword.getUsername());
				String newP = newPassword.getPassword();
				reset.setPassword(passwordEncoder().encode(newP));
//				reset.setPassword(newP);
				reset.setResetPassword(false);
				reset = userLoginRepository.save(reset);
				return true;
			}catch(Exception e) {
				System.out.println(e.getMessage());
				return false;
			}
			
		}
	
	public String generateRandomPassword() {
		  
	    int length = 6;
	    boolean useLetters = true;
	    boolean useNumbers = true;
		String generatedString = RandomStringUtils.random(length, useLetters, useNumbers);
		generatedString = generatedString.toLowerCase();
	 
	    System.out.println(generatedString);
	    return generatedString;
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}

}
