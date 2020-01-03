package com.upv.integra.model.acompanhamentos;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.Medicamento;

import org.springframework.lang.Nullable;

@Entity
public class Receita {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="RECEITA_CD_ID")
	private Long id;
	
	@Nullable
	@OneToMany(fetch=FetchType.EAGER)
	@JoinColumn(name="RECEITA_CD_MED")
	private Set<Medicamento> medicamentos;
	
	@Column(name ="RECEITA_TX_PERI")
	private String periodicidades;
	
	@Column(name = "RECEITA_BOOL_NEBU")
	private Boolean nebulizador;
	
	@Column(name = "RECEITA_TX_NEBU")
	private String modelo;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "RECEITA_DT_TROCA")
	private Date dt_ultTroca;
	
	@Override
	public String toString() {
		return "Receita [id=" + id + ", medicamentos=" + medicamentos + ", periodicidades=" + periodicidades
				+ ", nebulizador=" + nebulizador + ", modelo=" + modelo + ", dt_ultTroca=" + dt_ultTroca + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Medicamento> getMedicamentos() {
		return medicamentos;
	}

	public void setMedicamentos(Set<Medicamento> medicamentos) {
		this.medicamentos = medicamentos;
	}

	public String getPeriodicidades() {
		return periodicidades;
	}

	public void setPeriodicidades(String periodicidades) {
		this.periodicidades = periodicidades;
	}

	public Boolean getNebulizador() {
		return nebulizador;
	}

	public void setNebulizador(Boolean nebulizador) {
		this.nebulizador = nebulizador;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public Date getDt_ultTroca() {
		return dt_ultTroca;
	}

	public void setDt_ultTroca(Date dt_ultTroca) {
		this.dt_ultTroca = dt_ultTroca;
	}
	
}
