package com.trabalho_web.trabalho_sistema_cadastro.services;

import com.trabalho_web.trabalho_sistema_cadastro.entities.Cargo;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.CargoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    public List<Cargo> findAll(){
        return cargoRepository.findAll();
    }

    public Cargo findById(String id){
        return cargoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cargo não encontrado com id: " +id));
    }

    public Cargo create(Cargo Cargo){
        return cargoRepository.save(Cargo);
    }

    public Cargo update(String id, Cargo Cargo){
        Cargo CargoExistente = cargoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cargo não encontrado com id: " +id));

        if(Cargo.getNome() != null){
            CargoExistente.setNome(Cargo.getNome());
        }

        if(Cargo.getFuncao() != null){
            CargoExistente.setFuncao(Cargo.getFuncao());
        }

        return cargoRepository.save(CargoExistente);
    }

    public void delete(String id){
        if (!cargoRepository.existsById(id)) {
            throw new EntityNotFoundException("Cargo não encontrado com id: " + id);
        }
        cargoRepository.deleteById(id);
    }
}