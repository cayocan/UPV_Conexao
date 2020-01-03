package com.upv.integra.repository.imp;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Pessoa;
import com.upv.integra.repository.PessoaRepository;

@Repository
public class PessoaRepositoryImp{
	
	private static final Logger logger = LoggerFactory.getLogger(PessoaRepositoryImp.class);
	@Autowired PessoaRepository personRepository;
	
	public List<Pessoa> findAll(){
		return personRepository.findAllByEnable(true);
	}
	public Pessoa save(Pessoa person) {
		person.setEnable(true);
		return personRepository.save(person);
	}
	public Optional<Pessoa> findOneById(Long id) {
		return personRepository.findById(id);
	}
	public Pessoa getById(Long Id) {
		return personRepository.findById(Id).get();
	}
	public List<Pessoa> findAllByCpf(String cpf) {
		List<Pessoa> lp = personRepository.findByCpfAndEnable(cpf, true);
		logger.info(lp.toString());
		return lp;
	}
	
	public void deletePerson(Pessoa person) {
		personRepository.delete(person);
	}
	
//	public List<Pessoa> findAllByEmailBoasVindas(){
//		return personRepository.findAllByEmailBoasVindasAndEnable(true, true);
//	}
	public List<Pessoa> saveAll(List<Pessoa> pessoas) {
		return personRepository.saveAll(pessoas);
		
	}

}

