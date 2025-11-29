package com.trabalho_web.trabalho_sistema_cadastro.controllers;

import com.trabalho_web.trabalho_sistema_cadastro.entities.Cargo;
import com.trabalho_web.trabalho_sistema_cadastro.services.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cargos")
public class CargoController {

    @Autowired
    private CargoService cargoService;

    @GetMapping
    public ResponseEntity<List<Cargo>> findAll(){
        return ResponseEntity.ok(cargoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cargo> findById(@PathVariable String id){
        return ResponseEntity.ok(cargoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Cargo> create(@RequestBody Cargo Cargo){
        return ResponseEntity.ok(cargoService.create(Cargo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cargo> update(@PathVariable String id, @RequestBody Cargo Cargo){
        return ResponseEntity.ok(cargoService.update(id, Cargo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        cargoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
