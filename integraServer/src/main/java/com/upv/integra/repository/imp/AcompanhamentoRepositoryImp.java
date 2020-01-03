package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Acompanhamento;
import com.upv.integra.model.TipoAcompanhamento;
import com.upv.integra.repository.AcompanhamentoRepository;


@Repository
public class AcompanhamentoRepositoryImp{

	@Autowired AcompanhamentoRepository acompanhamentoRepository;
	private static final Logger logger = LoggerFactory.getLogger(AcompanhamentoRepositoryImp.class);
	
	public List<Acompanhamento> findAll(){
		return acompanhamentoRepository.findAll();
	}
	public List<Acompanhamento> findAll(Sort s){
		return acompanhamentoRepository.findAll(s);
	}
	
	public Acompanhamento save(Acompanhamento obj) {
		return acompanhamentoRepository.save(obj);
	}
	public Optional<Acompanhamento> findOneById(Long id) {
		return acompanhamentoRepository.findById(id);
	}
	public Acompanhamento getById(Long Id) {
		return acompanhamentoRepository.findById(Id).get();
	}
	public List<Acompanhamento> findAllByTipoAcompanhamento(TipoAcompanhamento tipo) {
		List<Acompanhamento> la = findAll(sortByIdAsc());
		List<Acompanhamento> fl = new ArrayList<Acompanhamento>();
		la.forEach(obj -> {
			if(obj.getTipoAcomp().equals(tipo)) {
				fl.add(obj);
			}
		});
		return fl;		
	}
	public List<Acompanhamento> findAllByPacienteId(Long id) {
		List<Acompanhamento> la = findAll(sortByIdAsc());
		List<Acompanhamento> fl = new ArrayList<Acompanhamento>();
		la.forEach(obj -> {
			if(obj.getPaciente().getId().equals(id)) {
				fl.add(obj);
			}
		});
		return fl;		
	}
	public List<Acompanhamento> findByPacienteIdAndType(Long id,TipoAcompanhamento tipo) {
		List<Acompanhamento> la = findAll(sortByIdAsc());
		List<Acompanhamento> fl = new ArrayList<Acompanhamento>();
		la.forEach(obj -> {
			if(obj.getPaciente().getId().equals(id) && obj.getTipoAcomp().equals(tipo)) {
				fl.add(obj);
			}
		});
		return fl;		
	}
	public void delete(Acompanhamento obj) {
		acompanhamentoRepository.delete(obj);
	}
	public List<Acompanhamento> saveAll(List<Acompanhamento> obj) {
		return acompanhamentoRepository.saveAll(obj);
		
	}
	
	private Sort sortByIdAsc() {
        return new Sort(Sort.Direction.ASC, "id");
    }
}

