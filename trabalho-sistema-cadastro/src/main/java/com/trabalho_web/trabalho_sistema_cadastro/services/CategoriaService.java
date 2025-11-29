package com.trabalho_web.trabalho_sistema_cadastro.services;

import com.trabalho_web.trabalho_sistema_cadastro.entities.Categoria;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.CategoriaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAll(){
        return categoriaRepository.findAll();
    }

    public Categoria findById(String id){
        return categoriaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrado com id: " +id));
    }

    public Categoria create(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public Categoria update(String id, Categoria categoria){
        Categoria categoriaExistente = categoriaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Categoria não encontrado com id: " +id));

        if(categoria.getNome() != null){
            categoriaExistente.setNome(categoria.getNome());
        }

        if(categoria.getTipo() != null){
            categoriaExistente.setTipo(categoria.getTipo());
        }

        return categoriaRepository.save(categoriaExistente);
    }

    public void delete(String id){
        if (!categoriaRepository.existsById(id)) {
            throw new EntityNotFoundException("Categoria não encontrado com id: " + id);
        }
        categoriaRepository.deleteById(id);
    }
}
