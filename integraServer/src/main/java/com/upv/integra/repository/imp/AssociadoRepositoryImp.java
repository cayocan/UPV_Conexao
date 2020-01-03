package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Associado;
import com.upv.integra.model.TipoAssociado;
import com.upv.integra.repository.AssociadoRepository;


@Repository
public class AssociadoRepositoryImp{

	@Autowired AssociadoRepository associadoRepository;
	private static final Logger logger = LoggerFactory.getLogger(AssociadoRepositoryImp.class);
	
	public List<Associado> findAll(){
		return associadoRepository.findAll();
	}
	public List<Associado> findAll(Sort s){
		return associadoRepository.findAll(s);
	}
	public Associado save(Associado obj) {
		return associadoRepository.save(obj);
	}
	public Optional<Associado> findOneById(Long id) {
		return associadoRepository.findById(id);
	}
	public Associado getById(Long Id) {
		return associadoRepository.findById(Id).get();
	}
	public List<Associado> findAllByTipoAcompanhamento(TipoAssociado tipo) {
		List<Associado> la = findAll(sortByIdAsc());
		List<Associado> fl = new ArrayList<Associado>();
		la.forEach(obj -> {
			if(obj.getTipoAssoc().equals(tipo)) {
				fl.add(obj);
			}
		});
		return fl;		
	}
	public List<Associado> findAllByPacienteId(Long id) {
		List<Associado> la = findAll(sortByIdAsc());
		List<Associado> fl = new ArrayList<Associado>();
		la.forEach(obj -> {
			if(obj.getPaciente().getId().equals(id)) {
				fl.add(obj);
			}
		});
		return fl;		
	}
	public List<Associado> findByPacienteIdAndType(Long id,TipoAssociado tipo) {
		List<Associado> la = findAll(sortByIdAsc());
		List<Associado> fl = new ArrayList<Associado>();
		la.forEach(obj -> {
			if(obj.getPaciente().getId().equals(id) && obj.getTipoAssoc().equals(tipo)) {
				fl.add(obj);
			}
		});
		return fl;		
	}
	public void delete(Associado obj) {
		associadoRepository.delete(obj);
	}
	public List<Associado> saveAll(List<Associado> obj) {
		return associadoRepository.saveAll(obj);
		
	}
	
	private Sort sortByIdAsc() {
        return new Sort(Sort.Direction.ASC, "id");
    }

}

