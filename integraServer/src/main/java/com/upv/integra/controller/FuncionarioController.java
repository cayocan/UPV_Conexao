package com.upv.integra.controller;

import java.util.List;

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
import com.upv.integra.model.Acompanhamento;
import com.upv.integra.model.Apoiador;
import com.upv.integra.model.Associado;
import com.upv.integra.model.Atendimento;
import com.upv.integra.model.Paciente;
import com.upv.integra.model.dto.AcompanhamentoDTO;
import com.upv.integra.model.dto.AssociadoDTO;
import com.upv.integra.model.dto.AtendimentoDTO;
import com.upv.integra.model.dto.FuncionarioDTO;
import com.upv.integra.model.dto.PacienteDTO;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.service.FuncionarioService;
import com.upv.integra.service.UtilService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(value="/func")
@Api(value="funcionario", tags= {"/func"})
public class FuncionarioController {
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioController.class);
	
	@Autowired	UtilService utilService;
	@Autowired	FuncionarioService funcService;
	@Autowired 	DadosCadastraisRepository contactsRepository;
	
		@ApiOperation(value="Create Funcionario")
		@PostMapping
		public ResponseEntity<Object> createFuncionario(@RequestBody FuncionarioDTO funcionarioDTO) {
			logger.info("Controller createFuncionario invoked ");
			logger.debug("Controller createFuncionario invoked. Person object: {}", funcionarioDTO.toString());
			try {
				return new ResponseEntity<Object>(funcService.saveFuncionario(funcionarioDTO,"USER"), HttpStatus.OK);
			}catch (BusinessException e){
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				return new ResponseEntity<Object>(e.getMessage(), HttpStatus.BAD_REQUEST);
			}
		}

		@ApiOperation(value="List All Funcionario")
		@GetMapping(produces="application/json")
		public ResponseEntity<Object> listFunc(){
			return new ResponseEntity<Object>(funcService.listFuncionarios(), HttpStatus.OK);
		}
		
		@ApiOperation(value="List All Funcionario By Same Assoc")
		@GetMapping(produces="application/json", value="/list")
		public ResponseEntity<Object> listFuncSameAssoc(){
			return new ResponseEntity<Object>(funcService.findAllBySameAssoc(), HttpStatus.OK);
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
		
		@ApiOperation(value="Update Funcionario")
		@PutMapping
		public FuncionarioDTO updateFuncionario(@RequestBody FuncionarioDTO funcionarioDTO) {
			logger.info("Controller updateFuncionario invoked ");
			logger.debug("Controller updateFuncionario invoked. Person object: {}", funcionarioDTO.toString());
			try {
				return funcService.updateFuncionario(funcionarioDTO);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());;
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List One Funcionario by id")
		@GetMapping(value="{id}")
		public FuncionarioDTO findFuncionario(@PathVariable Long id) {
			logger.info("Controller findFuncionario invoked ");
			logger.debug("Controller findFuncionario invoked. Person ID: {}", id);
			try {
				return funcService.findFuncionario(id);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("PersonID: {}", id);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}

		@ApiOperation(value="Delete Funcionario")
		@DeleteMapping(value="{id}")
		public String deleteFuncionario(@PathVariable long id) {

			logger.info("Controller deleteFuncionario invoked ");
			logger.debug("Controller deleteFuncionario invoked. Person object: {}", id);
			try {
				return funcService.deleteFuncionario(id);
			}catch(BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Apoiadores By Funcionario id")
		@GetMapping(value="apoia/{funcId}")
		public List<Apoiador> findApoiadoresCadastrados(@PathVariable Long funcId) {
			logger.info("Controller find Apoiadores by Funcionario Id invoked ");
			logger.debug("Controller find Apoiadores by Funcionario Id invoked. Funcionario ID: {}", funcId);
			try {
				return funcService.findApoiadoresCadastrados(funcId);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("FuncId: {}", funcId);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}

		@ApiOperation(value="List Apoiadores By Funcionario id")
		@GetMapping(value="paci/{funcId}")
		public List<PacienteDTO> findPacientesCadastrados(@PathVariable Long funcId) {
			logger.info("Controller find Paciente by Funcionario Id invoked ");
			logger.debug("Controller find Paciente by Funcionario Id invoked. Funcionario ID: {}", funcId);
			try {
				return funcService.findPacientesCadastrados(funcId);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("FuncId: {}", funcId);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Apoiadores By Funcionario id")
		@GetMapping(value="atend/{funcId}")
		public List<AtendimentoDTO> findAtendimentosCadastrados(@PathVariable Long funcId) {
			logger.info("Controller find Atendimento by Funcionario Id invoked ");
			logger.debug("Controller find Atendimento by Funcionario Id invoked. Funcionario ID: {}", funcId);
			try {
				return funcService.findAtendimentosCadastrados(funcId);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("FuncId: {}", funcId);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		
		@ApiOperation(value="List Apoiadores By Funcionario id")
		@GetMapping(value="acomp/{funcId}")
		public List<AcompanhamentoDTO> findAcompanhamentosCadastrados(@PathVariable Long funcId) {
			logger.info("Controller find Acompanhamento by Funcionario Id invoked ");
			logger.debug("Controller find Acompanhamento by Funcionario Id invoked. Funcionario ID: {}", funcId);
			try {
				return funcService.findAcompanhamentosCadastrados(funcId);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("FuncId: {}", funcId);
				System.out.println(e.getMessage());
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(),null);
			}
		}
		@ApiOperation(value="List Apoiadores By Funcionario id")
		@GetMapping(value="associados/{funcId}")
		public List<AssociadoDTO> findAssociadosCadastrados(@PathVariable Long funcId) {
			logger.info("Controller find associados by Funcionario Id invoked ");
			logger.debug("Controller find associados by Funcionario Id invoked. Funcionario ID: {}", funcId);
			try {
				return funcService.findAssociadosCadastrados(funcId);
			}catch (BusinessException e) {
				logger.error(e.getMessage(), e.getCause());
				logger.debug("FuncId: {}", funcId);
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
