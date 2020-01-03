package com.upv.integra.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.upv.integra.constants.Constants;
import com.upv.integra.exception.BusinessException;
import com.upv.integra.model.Certificacao;
import com.upv.integra.model.dto.AssociacaoDTO;
import com.upv.integra.security.InterfaceAuthenticationFacade;
import com.upv.integra.security.jwt.resources.JwtUserDetailsDTO;
import com.upv.integra.service.AssociacaoService;
import com.upv.integra.service.UtilService;

import io.swagger.annotations.ApiOperation;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/assoc")
public class AssociacaoController {
	
	private static final Logger logger = LoggerFactory.getLogger(AssociacaoController.class);
	
	@Autowired AssociacaoService associacaoService;
	@Autowired UtilService utilService;
	
	@ApiOperation(value="Create Associacao")
	@PostMapping
	public ResponseEntity<Object> createAssociacao(@RequestBody AssociacaoDTO associacaoDTO) {
		logger.info("Controller createAssociacao invoked ");
		logger.debug("Controller createAssociacao invoked. Person object: {}", associacaoDTO.toString());
				
		try {			
			return new ResponseEntity<Object>(associacaoService.saveAssociacao(associacaoDTO), HttpStatus.OK);
			
		}catch (BusinessException e){
			logger.error("Error Message: "+e.getMessage(),"Error Cause: "+ e.getCause());;
			System.out.println(e.getMessage());
			return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@ApiOperation(value="List All Associacao, NOT USED FOR PRODUCTION")
	@GetMapping
	public List<AssociacaoDTO> listAll() {
		return associacaoService.listAll();
	}
	
	@ApiOperation(value="Update Associacao")
	@PutMapping
	public AssociacaoDTO updateAssociacao(@RequestBody AssociacaoDTO associacaoDTO) {
		logger.info("Controller updateAssociacao invoked ");
		logger.debug("Controller updateAssociacao invoked. Person object: {}", associacaoDTO.toString());
		try {
			return associacaoService.updateAssociacao(associacaoDTO);
		}catch(BusinessException e) {
			logger.error(e.getMessage(), e.getCause());;
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
		}
	}
	
	@ApiOperation(value="List One Associacao by id")
	@GetMapping(value="{id}")
	public AssociacaoDTO findAssociacao(@PathVariable Long id) {
		logger.info("Controller findAssociacao invoked ");
		logger.debug("Controller findAssociacao invoked. Person ID: {}", id);
		try {
			return associacaoService.findAssociacao(id);
		}catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}", id);
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
		}
	}

	@ApiOperation(value="Delete Associacao, Logical Delete")
	@DeleteMapping(value="{id}")
	public String deleteAssociacao(@PathVariable Long assocID) {

		logger.info("Controller deleteAssociacao invoked ");
		logger.debug("Controller deleteAssociacao invoked. Person object: {}", assocID);
		try {
			return associacaoService.deleteAssociacao(assocID);
		}catch(BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
		}
	}

	@ApiOperation(value="Verifify E-mail exist in DB")
	@GetMapping(value="/Email")
	public boolean emailInDB(@RequestParam String email){
		logger.info("Controller VerifyEmail invoked ");
		logger.debug("Controller VerifyEmail invoked. Email String: {}", email);
		return utilService.verifyEmail(email);
	}

	@ApiOperation(value="Verifify CNPJ exist in DB")
	@GetMapping(value="/cnpj")
	public boolean cnpjInDB(@RequestParam String cnpj){ 
		logger.info("Controller VerifyEmail invoked ");
		logger.debug("Controller VerifyEmail invoked. Email String: {}", cnpj);
		return associacaoService.verifyCNPJ(cnpj);
	}
	
	@ApiOperation(value="List All Certificados")
	@GetMapping(value="/cert")
	public List<Certificacao> listAllCertificados() {
		return associacaoService.listAllCertificados();
	}
	
//	@PostMapping
//	public AssociacaoDTO createAssociacao(@RequestBody AssociacaoDTO associacaoDTO) {
//		logger.info(" Controller CreateLevel invoked ");
//		logger.debug("Controller CreateLEvel invoked. Level object: {}", associacaoDTO.toString());
//		
//		return AssociacaoService.saveAssociacao(associacaoDTO);
//		
//	}
	
}