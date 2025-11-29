package com.trabalho_web.trabalho_sistema_cadastro.repositories;

import com.trabalho_web.trabalho_sistema_cadastro.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, String> {
}
