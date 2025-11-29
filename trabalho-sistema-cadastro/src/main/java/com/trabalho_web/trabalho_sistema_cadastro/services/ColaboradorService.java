package com.trabalho_web.trabalho_sistema_cadastro.services;



import com.trabalho_web.trabalho_sistema_cadastro.entities.Colaborador;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.ColaboradorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColaboradorService {

  @Autowired
  private ColaboradorRepository colaboradorRepository;

  public List<Colaborador> findAll(){
    return colaboradorRepository.findAll();
  }

  public Colaborador findById(String id){
    return colaboradorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Colaborador não encontrado com id: " +id));
  }

  public Colaborador create(Colaborador colaborador){
    return colaboradorRepository.save(colaborador);
  }

  public Colaborador update(String id, Colaborador colaborador){
    Colaborador colaboradorExistente = colaboradorRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Colaborador não encontrado com id: " +id));

    if(colaborador.getNome() != null){
      colaboradorExistente.setNome(colaborador.getNome());
    }

    if(colaborador.getCpf() != null){
      colaboradorExistente.setCpf(colaborador.getCpf());
    }

    if(colaborador.getDataDeNascimento() != null){
      colaboradorExistente.setDataDeNascimento(colaborador.getDataDeNascimento());
    }

    return colaboradorRepository.save(colaboradorExistente);
  }

  public void delete(String id){
    if (!colaboradorRepository.existsById(id)) {
      throw new EntityNotFoundException("Colaborador não encontrado com id: " + id);
    }
    colaboradorRepository.deleteById(id);
  }
}
