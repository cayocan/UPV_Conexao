package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Doacao;
import com.upv.integra.repository.DoacaoRepository;

@Repository
public class DoacaoRepositoryImp{

	@Autowired DoacaoRepository doacaoRepository;
	
	public List<Doacao> findAll(){
		return doacaoRepository.findAll(sortByIdDesc());
	}
	public Doacao save(Doacao atendimento) {
		return doacaoRepository.save(atendimento);
	}
	public Optional<Doacao> findOneById(Long id) {
		return doacaoRepository.findById(id);
	}
	public Doacao getById(Long Id) {
		return doacaoRepository.findById(Id).get();
	}
	public List<Doacao> findByApoiadorId(Long id) {
		List<Doacao> la = findAll();
		List<Doacao> fl = new ArrayList<Doacao>();
		la.forEach(contact -> {
			if(contact.getApoiador().getId().equals(id)) {
				fl.add(contact);
			}
		});
		return fl;		
	}	
	public void delete(Doacao obj) {
		doacaoRepository.delete(obj);
	}
	public List<Doacao> saveAll(List<Doacao> obj) {
		return doacaoRepository.saveAll(obj);
		
	}
	private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }
}

