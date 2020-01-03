package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Apoiador;
import com.upv.integra.repository.ApoiadorRepository;

@Repository
public class ApoiadorRepositoryImp{

	@Autowired ApoiadorRepository apoiadorRepository;
	
	public List<Apoiador> findAll(){
		return apoiadorRepository.findAll(sortByIdDesc());
	}
	public List<Apoiador> findAllBySameAssoc(Long assocId){
		return apoiadorRepository.findAllBySameAssoc(assocId, sortByIdDesc());
	}
	public Apoiador save(Apoiador atendimento) {
		return apoiadorRepository.save(atendimento);
	}
	public Optional<Apoiador> findOneById(Long id) {
		return apoiadorRepository.findById(id);
	}
	public Apoiador getById(Long Id) {
		return apoiadorRepository.findById(Id).get();
	}
	public List<Apoiador> getByEmail(String email) {
		List<Apoiador> la = findAll();
		List<Apoiador> fl = new ArrayList<Apoiador>();
		la.forEach(apoia -> {
			if(apoia.getPessoa().getDadosCadastrais().getEmail().equals(email)) {
				fl.add(apoia);
			}
		});
		return fl;		
	}	
	public void delete(Apoiador obj) {
		apoiadorRepository.delete(obj);
	}
	public List<Apoiador> saveAll(List<Apoiador> obj) {
		return apoiadorRepository.saveAll(obj);
		
	}
	public Long countApoias() {
		return apoiadorRepository.count();
	}
	private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }
}

