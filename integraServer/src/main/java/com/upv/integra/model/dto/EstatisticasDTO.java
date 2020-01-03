package com.upv.integra.model.dto;

public class EstatisticasDTO {

	private Long assocCount;
	private Long obitoCount;
	private Long paciCount;
	private Long diagCount;
	private Long atendCount;
	private Long apoiaCount;

	public EstatisticasDTO(Long assocCount, Long obitoCount, Long paciCount, Long diagCount, Long atendCount,
			Long apoiaCount) {
		super();
		this.assocCount = assocCount;
		this.obitoCount = obitoCount;
		this.paciCount = paciCount;
		this.diagCount = diagCount;
		this.atendCount = atendCount;
		this.apoiaCount = apoiaCount;
	}

	public EstatisticasDTO() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "EstatisticasDTO [assocCount=" + assocCount + ", obitoCount=" + obitoCount + ", paciCount=" + paciCount
				+ ", diagCount=" + diagCount + ", atendCount=" + atendCount + ", apoiaCount=" + apoiaCount + "]";
	}

	public Long getAssocCount() {
		return assocCount;
	}

	public void setAssocCount(Long assocCount) {
		this.assocCount = assocCount;
	}

	public Long getObitoCount() {
		return obitoCount;
	}

	public void setObitoCount(Long obitoCount) {
		this.obitoCount = obitoCount;
	}

	public Long getPaciCount() {
		return paciCount;
	}

	public void setPaciCount(Long paciCount) {
		this.paciCount = paciCount;
	}

	public Long getDiagCount() {
		return diagCount;
	}

	public void setDiagCount(Long diagCount) {
		this.diagCount = diagCount;
	}

	public Long getAtendCount() {
		return atendCount;
	}

	public void setAtendCount(Long atendCount) {
		this.atendCount = atendCount;
	}

	public Long getApoiaCount() {
		return apoiaCount;
	}

	public void setApoiaCount(Long apoiaCount) {
		this.apoiaCount = apoiaCount;
	}
}
