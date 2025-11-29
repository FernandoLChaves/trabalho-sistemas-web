package com.trabalho_web.trabalho_sistema_cadastro.repositories;

import com.trabalho_web.trabalho_sistema_cadastro.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, String> {
}