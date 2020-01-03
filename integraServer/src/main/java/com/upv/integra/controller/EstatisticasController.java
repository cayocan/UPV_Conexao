package com.upv.integra.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.upv.integra.exception.BusinessException;
import com.upv.integra.service.EstatisticaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/stat")
@Api(value = "estatisticas", tags = { "/stat" })
public class EstatisticasController {

	private static final Logger logger = LoggerFactory.getLogger(EstatisticasController.class);

	@Autowired
	EstatisticaService estatisticaService;
	
	@ApiOperation(value="Get EstatisticasDTO")
	@GetMapping(produces="application/json")
	public ResponseEntity<Object> getEstatisticasDTO(){
		return new ResponseEntity<Object>(estatisticaService.getEstats(), HttpStatus.OK);
	}

	@ApiOperation(value = "Número de Associações Cadastradas")
	@GetMapping(produces = "application/json", value = "assoc")
	public ResponseEntity<Object> getNumberOfAssocs() {
		logger.info("Controller getNumberOfAssocs invoked ");
		logger.debug("Controller getNumberOfAssocs invoked.");
		try {
			return new ResponseEntity<Object>(estatisticaService.getNumberOfAssocs(), HttpStatus.OK);
		} catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}");
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(), null);
		}
	}

	@ApiOperation(value = "Número de Pacientes Cadastrados")
	@GetMapping(produces = "application/json", value = "paci")
	public ResponseEntity<Object> getNumberOfPacientes() {
		logger.info("Controller getNumberOfPacientes invoked ");
		logger.debug("Controller getNumberOfPacientes invoked.");
		try {
			return new ResponseEntity<Object>(estatisticaService.getNumberOfPacientes(), HttpStatus.OK);
		} catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}");
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(), null);
		}
	}

	@ApiOperation(value = "Número de Óbitos Cadastrados")
	@GetMapping(produces = "application/json", value = "obitos")
	public ResponseEntity<Object> getNumberOfPacientesObitos() {
		logger.info("Controller getNumberOfPacientesObitos invoked ");
		logger.debug("Controller getNumberOfPacientesObitos invoked.");
		try {
			return new ResponseEntity<Object>(estatisticaService.getNumberOfPacientesObitos(), HttpStatus.OK);
		} catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}");
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(), null);
		}
	}

	@ApiOperation(value = "Número de Diagnosticos Cadastrados")
	@GetMapping(produces = "application/json", value = "diag")
	public ResponseEntity<Object> getNumberOfDiags() {
		logger.info("Controller getNumberOfDiags invoked ");
		logger.debug("Controller getNumberOfDiags invoked.");
		try {
			return new ResponseEntity<Object>(estatisticaService.getNumberOfDiags(), HttpStatus.OK);
		} catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}");
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(), null);
		}
	}

	@ApiOperation(value = "Número de Diagnosticos Cadastrados")
	@GetMapping(produces = "application/json", value = "atend")
	public ResponseEntity<Object> getNumberOfAtends() {
		logger.info("Controller getNumberOfAtends invoked ");
		logger.debug("Controller getNumberOfAtends invoked.");
		try {
			return new ResponseEntity<Object>(estatisticaService.getNumberOfAtendsUnique(), HttpStatus.OK);
		} catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}");
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(), null);
		}
	}

	@ApiOperation(value = "Número de Diagnosticos Cadastrados")
	@GetMapping(produces = "application/json", value = "apoia")
	public ResponseEntity<Object> getNumberOfApoias() {
		logger.info("Controller getNumberOfApoias invoked ");
		logger.debug("Controller getNumberOfApoias invoked.");
		try {
			return new ResponseEntity<Object>(estatisticaService.getNumberOfApoias(), HttpStatus.OK);
		} catch (BusinessException e) {
			logger.error(e.getMessage(), e.getCause());
			logger.debug("PersonID: {}");
			System.out.println(e.getMessage());
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage().toString(), null);
		}
	}
}
