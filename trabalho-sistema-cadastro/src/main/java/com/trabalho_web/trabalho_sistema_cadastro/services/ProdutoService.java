package com.trabalho_web.trabalho_sistema_cadastro.services;


import com.trabalho_web.trabalho_sistema_cadastro.entities.Produto;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> findAll(){
        return produtoRepository.findAll();
    }

    public Produto findById(String id){
        return produtoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com id: " +id));
    }

    public Produto create(Produto produto){
        return produtoRepository.save(produto);
    }

    public Produto update(String id, Produto produto){
        Produto produtoExistente = produtoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com id: " +id));

        if(produto.getNome() != null){
            produtoExistente.setNome(produto.getNome());
        }

        if(produto.getQuantidade() != null){
            produtoExistente.setQuantidade(produto.getQuantidade());
        }

        if(produto.getStatus() != null){
            produtoExistente.setStatus(produto.getStatus());
        }

        if(produto.getPreco() != null){
            produtoExistente.setPreco(produto.getPreco());
        }

        return produtoRepository.save(produtoExistente);
    }

    public void delete(String id){
        if (!produtoRepository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado com id: " + id);
        }
        produtoRepository.deleteById(id);
    }
}