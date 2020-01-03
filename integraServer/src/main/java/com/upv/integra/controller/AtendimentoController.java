package com.upv.integra.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.upv.integra.exception.BusinessException;
import com.upv.integra.model.dto.AtendimentoDTO;
import com.upv.integra.service.AtendimentoService;
import com.upv.integra.service.UtilService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(value="/atend")
@Api(value="atendimento", tags= {"/atend"})
public class AtendimentoController {
	
	private static final Logger logger = LoggerFactory.getLogger(AtendimentoController.class);
	
	@Autowired	AtendimentoService atendimentoService;
	@Autowired	UtilService utilService;
	
		@ApiOperation(value="Create Atendimento")
		@PostMapping
		public ResponseEntity<Object> createAtendimento(@RequestBody AtendimentoDTO atendimento){
			logger.info("Controller createAtendimento invoked ");
			logger.debug("Controller createAtendimento invoked. Person object: {}", atendimento.toString());
			try {
				return new ResponseEntity<Object>(atendimentoService.saveAtendimento(atendimento), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

		@ApiOperation(value="List All Atendimento, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json")
		public ResponseEntity<Object> listAtendimentos(){
			return new ResponseEntity<Object>(atendimentoService.listAtendimento(), HttpStatus.OK);
		}
		
//		//@ApiOperation(value="Get all Clindrens for Person")
//		@GetMapping(value="/GetChildren")
//		public ResponseEntity<Object> listDependents(@RequestParam long parentID){
//			logger.info("Controller listDependents invoked ");
//			logger.debug("Controller listDependents invoked. Person ID: {}", parentID);
//			try {
//				return new ResponseEntity<Object>(funcService.listChildren(parentID), HttpStatus.OK);
//			}catch(BusinessException e) {
//				logger.error(e.getMessage(), e.getCause());;
//				System.out.println(e.getMessage());
//				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
//			}
//		}
		
		@ApiOperation(value="List One Atendimento by id")
		@GetMapping(value="Pessoa/{id}")
		public ResponseEntity<Object> ListAtendimentosByPersonId(@PathVariable Long id) {
			logger.info("Controller ListAtendimentosByPersonId invoked ");
			logger.debug("Controller ListAtendimentosByPersonId invoked. Person ID: {}", id);
			try {
				return new ResponseEntity<Object>(atendimentoService.listAtendimentoByPersonId(id),HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
//		//@ApiOperation(value="Get all Clindrens for Person")
//		@GetMapping(value="/GetChildren")
//		public ResponseEntity<Object> listDependents(@RequestParam long parentID){
//			logger.info("Controller listDependents invoked ");
//			logger.debug("Controller listDependents invoked. Person ID: {}", parentID);
//			try {
//				return new ResponseEntity<Object>(funcService.listChildren(parentID), HttpStatus.OK);
//			}catch(BusinessException e) {
//				logger.error(e.getMessage(), e.getCause());;
//				System.out.println(e.getMessage());
//				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
//			}
//		}
		
		@ApiOperation(value="Update Atendimentos")
		@PutMapping
		public AtendimentoDTO updateAtendimento(@RequestBody AtendimentoDTO atendimento) {
			logger.info("Controller updateAtendimento invoked ");
			logger.debug("Controller updateAtendimento invoked. Person object: {}", atendimento.toString());
			try {
				return atendimentoService.updateAtendimento(atendimento);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(),null);
			}
		}
		
		@ApiOperation(value="List One Atendimento by id")
		@GetMapping(value="{id}")
		public AtendimentoDTO findAtendimento(@PathVariable Long id) {
			logger.info("Controller findFAtendimento invoked ");
			logger.debug("Controller findFAtendimento invoked. Person ID: {}", id);
			try {
				return atendimentoService.findAtendimento(id);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}

		@ApiOperation(value="Delete Atendimento")
		@DeleteMapping(value="{id}")
		public String deleteAtendimento(@PathVariable long id) {

			logger.info("Controller deleteAtendimento invoked ");
			logger.debug("Controller deleteAtendimento invoked. Person object: {}", id);
			try {
				return atendimentoService.deleteAtendimento(id);
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

		@ApiOperation(value="Verifify CPF exist in DB")
		@GetMapping(value="/cpf")
		public boolean cpfInDB(@RequestParam String cpf){ 
			logger.info("Controller VerifyEmail invoked ");
			logger.debug("Controller VerifyEmail invoked. Email String: {}", cpf);
			return utilService.verifyCPF(cpf);
		}

}
