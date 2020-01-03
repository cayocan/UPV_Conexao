package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Associacao;
import com.upv.integra.repository.AssociacaoRepository;

@Repository
public class AssociacaoRepositoryImp{
	
	private static final Logger logger = LoggerFactory.getLogger(AssociacaoRepositoryImp.class);
	@Autowired AssociacaoRepository associacaoRepository;
	
	public List<Associacao> findAll(){
		return associacaoRepository.findAllByEnable(true);
	}
	public Associacao save(Associacao assoc) {
		logger.info("Param: "+assoc.toString());
		assoc.setEnable(true);
		Associacao retorno = associacaoRepository.save(assoc);
		logger.info(retorno.toString());;
		return retorno;
	}
	public Optional<Associacao> findOneById(Long id) {
		return associacaoRepository.findById(id);
	}
	public Associacao findByNome(String n) {
		return associacaoRepository.findByNome(n);
	}
	public Associacao getById(Long Id) {
		return associacaoRepository.findById(Id).get();
	}
	public List<Associacao> findAllByCnpj(String cnpj) {
		return associacaoRepository.findByCnpjAndEnable(cnpj, true);
	}
	
	public List<Associacao> getByEmail(String email) {
		List<Associacao> la = findAll();
		List<Associacao> fl = new ArrayList<Associacao>();
		la.forEach(item -> {
			if(item.getDadosCadastrais().getEmail().equals(email)) {
				fl.add(item);
			}
		});
		return fl;		
	}
	
	public List<Associacao> getByCnpj(String cpf) {
		List<Associacao> la = findAll();
		List<Associacao> fl = new ArrayList<Associacao>();
		la.forEach(apoia -> {
			if(apoia.getCnpj() == cpf) {
				fl.add(apoia);
			}
		});
		return fl;		
	}
	
	public void deleteAssociacao(Associacao assoc) {
		associacaoRepository.delete(assoc);
	}
	
//	public List<Pessoa> findAllByEmailBoasVindas(){
//		return personRepository.findAllByEmailBoasVindasAndEnable(true, true);
//	}
	public List<Associacao> saveAll(List<Associacao> assoc) {
		return associacaoRepository.saveAll(assoc);		
	}

	public Long countAssocs() {
		return associacaoRepository.count();
	}
}

