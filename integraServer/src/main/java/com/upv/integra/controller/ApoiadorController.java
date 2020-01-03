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
import com.upv.integra.model.Apoiador;
import com.upv.integra.model.dto.ApoiadorContatoDTO;
import com.upv.integra.model.dto.DoacaoDTO;
import com.upv.integra.service.ApoiadorService;
import com.upv.integra.service.UtilService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(value="/apoia")
@Api(value="apoiador", tags= {"/apoia"})
public class ApoiadorController {
	
	private static final Logger logger = LoggerFactory.getLogger(ApoiadorController.class);
	
	@Autowired	ApoiadorService apoiadorService;
	@Autowired	UtilService utilService;
	
		@ApiOperation(value="Create Apoiador")
		@PostMapping
		public ResponseEntity<Object> createApoiador(@RequestBody Apoiador atendimento){
			logger.info("Controller createApoiador invoked ");
			logger.debug("Controller createApoiador invoked. Person object: {}", atendimento.toString());
			try {
				return new ResponseEntity<Object>(apoiadorService.saveApoiador(atendimento), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}
		
		@ApiOperation(value="Create ApoiadorContato")
		@PostMapping(value="/contato")
		public ResponseEntity<Object> createApoiadorContato(@RequestBody ApoiadorContatoDTO apoiadorContatoDTO){
			logger.info("Controller createApoiadorContato invoked ");
			logger.debug("Controller createApoiadorContato invoked. Person object: {}", apoiadorContatoDTO.toString());
			try {
				return new ResponseEntity<Object>(apoiadorService.saveApoiadorContato(apoiadorContatoDTO), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}
		
		@ApiOperation(value="Create Doacao")
		@PostMapping(value="/doacao")
		public ResponseEntity<Object> createDoacao(@RequestBody DoacaoDTO doacaoDTO){
			logger.info("Controller createDoacao invoked ");
			logger.debug("Controller createDoacao invoked. Person object: {}", doacaoDTO.toString());
			try {
				return new ResponseEntity<Object>(apoiadorService.saveDoacao(doacaoDTO), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

		@ApiOperation(value="List All Apoiador, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json")
		public ResponseEntity<Object> listApoiadores(){
			return new ResponseEntity<Object>(apoiadorService.listApoiadores(), HttpStatus.OK);
		}
		
		@ApiOperation(value="List All Apoiador, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json", value="/list")
		public ResponseEntity<Object> listApoiadoresBySameAssoc(){
			return new ResponseEntity<Object>(apoiadorService.listApoiadoresBySameAssoc(), HttpStatus.OK);
		}
		
		@ApiOperation(value="Update Apoiador")
		@PutMapping
		public Apoiador updateAtendimento(@RequestBody Apoiador apoiador) {
			logger.info("Controller updateApoiador invoked ");
			logger.debug("Controller updateApoiador invoked. Person object: {}", apoiador.toString());
			try {
				return apoiadorService.updateApoiador(apoiador);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="Update Contato")
		@PutMapping(value="/contato")
		public ApoiadorContatoDTO updateContato(@RequestBody ApoiadorContatoDTO apoiadorContatoDTO) {
			logger.info("Controller updateContato invoked ");
			logger.debug("Controller updateContato invoked. Person object: {}", apoiadorContatoDTO.toString());
			try {
				return apoiadorService.updateContato(apoiadorContatoDTO);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="Update Doacao")
		@PutMapping(value="/doacao")
		public DoacaoDTO updateDoacao(@RequestBody DoacaoDTO doacaoDTO) {
			logger.info("Controller updateDoacao invoked ");
			logger.debug("Controller updateDoacao invoked. Person object: {}", doacaoDTO.toString());
			try {
				return apoiadorService.updateDoacao(doacaoDTO);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="List One Apoiador by id")
		@GetMapping(value="{id}")
		public Apoiador findApoiador(@PathVariable Long id) {
			logger.info("Controller findAtendimento invoked ");
			logger.debug("Controller findAtendimento invoked. Person ID: {}", id);
			try {
				return apoiadorService.findApoiador(id);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="List Contatos from One Apoiador by id")
		@GetMapping(produces="application/json",value="{id}/contatos")
		public ResponseEntity<Object> ApoiadorContados(@PathVariable Long id) {
			logger.info("Controller ApoiadorContados invoked ");
			logger.debug("Controller ApoiadorContados invoked. Person ID: {}", id);
			try {
				return new ResponseEntity<Object>(apoiadorService.findContatos(id), HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="List Doacoes from One Apoiador by id")
		@GetMapping(produces="application/json",value="{id}/doacoes")
		public ResponseEntity<Object> ApoiadorDoacoes(@PathVariable Long id) {
			logger.info("Controller ApoiadorDoacoes invoked ");
			logger.debug("Controller ApoiadorDoacoes invoked. Person ID: {}", id);
			try {
				return new ResponseEntity<Object>(apoiadorService.findDoacoes(id), HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}

		@ApiOperation(value="Delete Apoiador, Logical Delete")
		@DeleteMapping
		public String deleteAtendimento(@RequestBody long id) {

			logger.info("Controller deleteApoiador invoked ");
			logger.debug("Controller deleteApoiador invoked. Person object: {}", id);
			try {
				return apoiadorService.deleteApoiador(id);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="Delete Contato, Logical Delete")
		@DeleteMapping(value="/contato")
		public String deleteContato(@RequestBody long id) {

			logger.info("Controller deleteContato invoked ");
			logger.debug("Controller deleteContato invoked. Person object: {}", id);
			try {
				return apoiadorService.deleteContato(id);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
			}
		}
		
		@ApiOperation(value="Delete doacao, Logical Delete")
		@DeleteMapping(value="/doacao")
		public String deleteDoacao(@RequestBody long id) {

			logger.info("Controller deleteDoacao invoked ");
			logger.debug("Controller deleteDoacao invoked. Person object: {}", id);
			try {
				return apoiadorService.deleteDoacao(id);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getCode().toString(),null);
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
