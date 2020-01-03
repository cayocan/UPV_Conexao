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
import com.upv.integra.model.dto.AcompanhamentoDTO;
import com.upv.integra.model.dto.AssociadoDTO;
import com.upv.integra.model.dto.PacienteDTO;
import com.upv.integra.service.PacienteService;
import com.upv.integra.service.UtilService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(value="/paci")
@Api(value="paciente", tags= {"/paci"})
public class PacienteController {
	
	private static final Logger logger = LoggerFactory.getLogger(PacienteController.class);
	
	@Autowired	PacienteService pacienteService;
	@Autowired	UtilService utilService;
	
		@ApiOperation(value="Create Paciente")
		@PostMapping
		public ResponseEntity<Object> createPaciente(@RequestBody PacienteDTO pacienteDTO){
			logger.info("Controller createPaciente invoked ");
			logger.debug("Controller createPaciente invoked. Person object: {}", pacienteDTO.toString());
			try {
				return new ResponseEntity<Object>(pacienteService.savePaciente(pacienteDTO), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}
		
		@ApiOperation(value="Create Acompanhamento")
		@PostMapping(value="/acomp")
		public ResponseEntity<Object> createAcompnhamento(@RequestBody AcompanhamentoDTO acompanhamentoDTO){
			logger.info("Controller createAcompnhamento invoked ");
			logger.debug("Controller createAcompnhamento invoked. Person object: {}", acompanhamentoDTO.toString());
			try {
				return new ResponseEntity<Object>(pacienteService.saveAcompanhamento(acompanhamentoDTO), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}
		
		@ApiOperation(value="Create Associado")
		@PostMapping(value="/associado")
		public ResponseEntity<Object> createAssociado(@RequestBody AssociadoDTO associadoDTO){
			logger.info("Controller createAssociado invoked ");
			logger.debug("Controller createAssociado invoked. Person object: {}", associadoDTO.toString());
			try {
				return new ResponseEntity<Object>(pacienteService.saveAssociado(associadoDTO), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

		@ApiOperation(value="List All Pacientes, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json")
		public ResponseEntity<Object> listPacientesAtivos(){
			return new ResponseEntity<Object>(pacienteService.listPacientes(false), HttpStatus.OK);
		}
		@ApiOperation(value="List All Pacientes, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json", value="/inativos")
		public ResponseEntity<Object> listPacientesInativos(){
			return new ResponseEntity<Object>(pacienteService.listPacientes(true), HttpStatus.OK);		
		}
		@ApiOperation(value="List All Acompanhamentos, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json", value="/acomp")
		public ResponseEntity<Object> listAcompanhamentos(){
			return new ResponseEntity<Object>(pacienteService.listAllAcompanhamentos(), HttpStatus.OK);
		}		
		@ApiOperation(value="List All Associados, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json", value="/associado")
		public ResponseEntity<Object> listAssociados(){
			return new ResponseEntity<Object>(pacienteService.listAllAssociados(), HttpStatus.OK);
		}
		
		///////////////////////////////////////////////////////////////
		@ApiOperation(value="List All Pacientes, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json",value="/list")
		public ResponseEntity<Object> listPacientesAtivosSameAssoc(){
			return new ResponseEntity<Object>(pacienteService.listPacientesBySameAssoc(false), HttpStatus.OK);
		}
		@ApiOperation(value="List All Pacientes, NOT USED FOR PRODUCTION")
		@GetMapping(produces="application/json", value="/inativos/list")
		public ResponseEntity<Object> listPacientesInativosSameAssoc(){
			return new ResponseEntity<Object>(pacienteService.listPacientesBySameAssoc(true), HttpStatus.OK);		
		}	
		///////////////////////////////////////////////////////////////		
		
		@ApiOperation(value="Update Paciente")
		@PutMapping
		public PacienteDTO updatePaciente(@RequestBody PacienteDTO pacienteDTO) {
			logger.info("Controller updatePaciente invoked ");
			logger.debug("Controller updatePaciente invoked. Person object: {}", pacienteDTO.toString());
			try {
				return pacienteService.updatePaciente(pacienteDTO);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="Update Acompanhamento")
		@PutMapping(value="/acomp")
		public AcompanhamentoDTO updateAcompanhamento(@RequestBody AcompanhamentoDTO acompanhamentoDTO) {
			logger.info("Controller updateAcompanhamento invoked ");
			logger.debug("Controller updateAcompanhamento invoked. Person object: {}", acompanhamentoDTO.toString());
			try {
				return pacienteService.updateAcompanhamento(acompanhamentoDTO);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="Update Associado")
		@PutMapping(value="/associado")
		public AssociadoDTO updateAssociado(@RequestBody AssociadoDTO associadoDTO) {
			logger.info("Controller updateAssociado invoked ");
			logger.debug("Controller updateAssociado invoked. Person object: {}", associadoDTO.toString());
			try {
				return pacienteService.updateAssociado(associadoDTO);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List One Paciente by id")
		@GetMapping(value="{id}")
		public PacienteDTO findPaciente(@PathVariable Long id) {
			logger.info("Controller findPaciente invoked ");
			logger.debug("Controller findPaciente invoked. Person ID: {}", id);
			try {
				return pacienteService.findPaciente(id);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Acompanhamento from One Paciente by id")
		@GetMapping(produces="application/json",value="{id}/acomp")
		public ResponseEntity<Object> PacienteAcompanhamentos(@PathVariable Long id) {
			logger.info("Controller PacienteAcompanhamentos invoked ");
			logger.debug("Controller PacienteAcompanhamentos invoked. Paciente ID: {}", id);
			try {
				return new ResponseEntity<Object>(pacienteService.findAcompanhamentos(id), HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Acompanhamento from One Paciente by id and one Type")
		@GetMapping(produces="application/json",value="{id}/acomp/{type}")
		public ResponseEntity<Object> PacienteAcompanhamentosByType(@PathVariable Long id, @PathVariable String type) {
			logger.info("Controller PacienteAcompanhamentosByType invoked ");
			logger.debug("Controller PacienteAcompanhamentosByType invoked. Paciente ID: {}", id);
			try {
				return new ResponseEntity<Object>(pacienteService.findAcompanhamentosByType(id,type), HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Associados from One Paciente by id")
		@GetMapping(produces="application/json",value="{id}/associado")
		public ResponseEntity<Object> PacienteAssociados(@PathVariable Long id) {
			logger.info("Controller PacienteAssociados invoked ");
			logger.debug("Controller PacienteAssociados invoked. Paciente ID: {}", id);
			try {
				return new ResponseEntity<Object>(pacienteService.findAssociados(id), HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Associados from One Paciente by id and one Type")
		@GetMapping(produces="application/json",value="{id}/associado/{type}")
		public ResponseEntity<Object> PacienteAssociadosByType(@PathVariable Long id, @PathVariable String type) {
			logger.info("Controller PacienteAssociadosByType invoked ");
			logger.debug("Controller PacienteAssociadosByType invoked. Paciente ID: {}", id);
			try {
				return new ResponseEntity<Object>(pacienteService.findAssociadosByType(id,type), HttpStatus.OK);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}

		@ApiOperation(value="Delete Paciente")
		@DeleteMapping(value="{id}")
		public String deletePaciente(@PathVariable Long id) {

			logger.info("Controller deletePaciente invoked ");
			logger.debug("Controller deletePaciente invoked. Person object: {}", id);
			try {
				return pacienteService.deletePaciente(id);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="Delete Acompanhamento")
		@DeleteMapping(value="/acomp/{id}")
		public String deleteAcompanhamento(@PathVariable Long id) {

			logger.info("Controller deleteAcompanhamento invoked ");
			logger.debug("Controller deleteAcompanhamento invoked. Person object: {}", id);
			try {
				return pacienteService.deleteAcompanhamento(id);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="Delete Associado")
		@DeleteMapping(value="/associado/{id}")
		public String deleteAssociado(@PathVariable Long id) {

			logger.info("Controller deleteAssociado invoked ");
			logger.debug("Controller deleteAssociado invoked. Person object: {}", id);
			try {
				return pacienteService.deleteAssociado(id);
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
