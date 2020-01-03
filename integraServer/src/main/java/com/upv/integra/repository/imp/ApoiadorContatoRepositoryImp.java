package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.ApoiadorContato;
import com.upv.integra.repository.ApoiadorContatoRepository;

@Repository
public class ApoiadorContatoRepositoryImp{

	@Autowired ApoiadorContatoRepository apoiadorContatoRepositoryImp;
	
	public List<ApoiadorContato> findAll(){
		return apoiadorContatoRepositoryImp.findAll(sortByIdDesc());
	}
	public ApoiadorContato save(ApoiadorContato atendimento) {
		return apoiadorContatoRepositoryImp.save(atendimento);
	}
	public Optional<ApoiadorContato> findOneById(Long id) {
		return apoiadorContatoRepositoryImp.findById(id);
	}
	public ApoiadorContato getById(Long Id) {
		return apoiadorContatoRepositoryImp.findById(Id).get();
	}
	public List<ApoiadorContato> findByApoiadorId(Long id) {
		List<ApoiadorContato> la = findAll();
		List<ApoiadorContato> fl = new ArrayList<ApoiadorContato>();
		la.forEach(contact -> {
			if(contact.getApoiador().getId().equals(id)) {
				fl.add(contact);
			}
		});
		return fl;		
	}	
	public void delete(ApoiadorContato obj) {
		apoiadorContatoRepositoryImp.delete(obj);
	}
	public List<ApoiadorContato> saveAll(List<ApoiadorContato> obj) {
		return apoiadorContatoRepositoryImp.saveAll(obj);
		
	}
	private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }
}

