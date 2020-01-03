package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	List<Role> findAll();
	Role findByName(String name);
}
