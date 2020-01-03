package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Paciente;
import com.upv.integra.repository.FuncionarioRepository;
import com.upv.integra.service.FuncionarioService;

@Repository
public class FuncionarioRepositoryImp{
	
	private static final Logger logger = LoggerFactory.getLogger(FuncionarioRepositoryImp.class);
	@Autowired FuncionarioRepository funcionarioRepository;
	
	public List<Funcionario> findAll(){
		return funcionarioRepository.findAllByEnable(true);
	}
	public Funcionario save(Funcionario funcionario) {
		//funcionario.setEnable(true);
		return funcionarioRepository.save(funcionario);
	}
	public Optional<Funcionario> findOneById(Long id) {
		return funcionarioRepository.findById(id);
	}
	public Funcionario getById(Long Id) {
		return funcionarioRepository.findById(Id).get();
	}
//	public List<Funcionario> findAllByCpf(String cpf) {
//		return funcionarioRepository.findByCpfAndEnable(cpf, true);
//	}
	public List<Funcionario> findAllBySameAssoc(Long assocId){
		List<Funcionario> retorno = funcionarioRepository.findAllBySameAssoc(assocId);
//		logger.info("RETORNO: "+retorno.toString());
		return retorno;
	}
	public List<Funcionario> getByEmail(String email) {
		List<Funcionario> la = findAll();
		List<Funcionario> fl = new ArrayList<Funcionario>();
		la.forEach(apoia -> {
			if(apoia.getPessoa().getDadosCadastrais().getEmail().equals(email)) {
				fl.add(apoia);
			}
		});
		return fl;		
	}
	
	public List<Funcionario> getByCpf(String cpf) {
		List<Funcionario> la = findAll();
		List<Funcionario> fl = new ArrayList<Funcionario>();
		la.forEach(apoia -> {
			if(apoia.getPessoa().getCpf() == cpf) {
				fl.add(apoia);
			}
		});
		return fl;		
	}
	
	public Boolean deleteFuncionario(Funcionario func) {
		logger.info("Delte Funcionario: "+func.toString());
		try {
			funcionarioRepository.delete(func);
			return true;
		} catch (Exception e) {
			logger.error(e.toString());
			return false;
		}		
	}
	public Funcionario findAllApoiadoresByFuncionarioId(Long Id) {
		return funcionarioRepository.findAllApoiadoresByFuncionarioId(Id);
	}
	public Funcionario findAllPacientesByFuncionarioId(Long Id) {
		return funcionarioRepository.findAllPacientesByFuncionarioId(Id);
	}
	public Funcionario findAllAtendimentosByFuncionarioId(Long Id) {
		return funcionarioRepository.findAllAtendimentosByFuncionarioId(Id);
	}
	public Funcionario findAllAcompanhamentosByFuncionarioId(Long Id) {
		return funcionarioRepository.findAllAcompanhamentosByFuncionarioId(Id);
	}
	public Funcionario findAllAssociadosByFuncionarioId(Long Id) {
		return funcionarioRepository.findAllAssociadosByFuncionarioId(Id);
	}
	
//	public List<Pessoa> findAllByEmailBoasVindas(){
//		return personRepository.findAllByEmailBoasVindasAndEnable(true, true);
//	}
	public List<Funcionario> saveAll(List<Funcionario> funcionarios) {
		return funcionarioRepository.saveAll(funcionarios);
		
	}
}

