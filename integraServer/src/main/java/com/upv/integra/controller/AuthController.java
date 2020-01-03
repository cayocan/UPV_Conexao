package com.upv.integra.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.upv.integra.model.dto.IntegraLoginDTO;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.service.EmailServiceImpl;
import com.upv.integra.service.IntegraLoginService;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/user")
public class AuthController {
	/*
	@GetMapping(path="/index")
	public String helloWorld() {
		return "Hello World";
	}
	
	@GetMapping(path="/index-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World");
	}
	
	@GetMapping(path="/index/{test}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String test) {
		return new HelloWorldBean(String.format("Hello World, %s", test));
	}
	*/
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired IntegraLoginRepository userLoginRepository;
	
	@Autowired IntegraLoginService userService;
	@Autowired EmailServiceImpl emailService;	
	
//	@PostMapping
//	public Boolean createLogin(@RequestBody IntegraLoginDTO userDTO) {
//		logger.info("Controller createLogin invoked ");
//		logger.debug("Controller CreateLogin invoked. Person object: {}", userDTO.toString());
//		try {
//			return userService.createLogin(userDTO);
//		}catch (Exception e){
//			logger.error(e.getMessage(), e.getCause());
//			System.out.println(e.getMessage());
//			return false;
//		}
//	}
	
	@PostMapping(value="/resetPassword")
	public ResponseEntity<Object> resetPassword(@RequestBody IntegraLoginDTO email){
		logger.info("Controller resetPassword invoked to email: "+email);
		
		try{
			return new ResponseEntity<Object>(userService.resetaPassword(email.getUsername()), HttpStatus.OK);
		}catch (Exception e ) {
			return new ResponseEntity<Object>(false, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping(value="/changePassword")
	public ResponseEntity<Object> changePassword(@RequestBody IntegraLoginDTO newPassword){
		logger.info("Controller ChangePassword invoked to IntegraLoginDTO: "+newPassword.toString());
		
		try{
			return new ResponseEntity<Object>(userService.changePassword(newPassword), HttpStatus.OK);
		}catch (Exception e ) {
			return new ResponseEntity<Object>(false, HttpStatus.BAD_REQUEST);
		}
	}		
}
