package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Atendimento;
import com.upv.integra.repository.AtendimentoRepository;

@Repository
public class AtendimentoRepositoryImp{
	
	@Autowired AtendimentoRepository atendimentoRepository;
	
	public List<Atendimento> findAll(){
		return atendimentoRepository.findAll(sortByIdDesc());
	}
	public Atendimento save(Atendimento atendimento) {
		return atendimentoRepository.save(atendimento);
	}
	public Optional<Atendimento> findOneById(Long id) {
		return atendimentoRepository.findById(id);
	}
	public Atendimento getById(Long Id) {
		return atendimentoRepository.findById(Id).get();
	}
	
	public Atendimento getByIdAndFetchFuncEagerly(Long Id) {
		return atendimentoRepository.findByIdAndFetchFuncEagerly(Id);
	}
	public List<Atendimento> getByEmail(String email) {
		List<Atendimento> la = findAll();
		List<Atendimento> fl = new ArrayList<Atendimento>();
		la.forEach(atend -> {
			if(atend.getPessoa().getDadosCadastrais().getEmail().equals(email)) {
				fl.add(atend);
			}
		});
		return fl;		
	}
	public void delete(Atendimento func) {
		atendimentoRepository.delete(func);
	}
	public List<Atendimento> saveAll(List<Atendimento> funcionarios) {
		return atendimentoRepository.saveAll(funcionarios);
		
	}
	public Long countAtends() {
		return atendimentoRepository.count();
	}
	
	private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }
}

