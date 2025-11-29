package com.trabalho_web.trabalho_sistema_cadastro.controllers;


import com.trabalho_web.trabalho_sistema_cadastro.entities.Colaborador;
import com.trabalho_web.trabalho_sistema_cadastro.services.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

  @Autowired
  private ColaboradorService colaboradorService;

  @GetMapping
  public ResponseEntity<List<Colaborador>> findAll(){
    return ResponseEntity.ok(colaboradorService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Colaborador> findById(@PathVariable String id){
    return ResponseEntity.ok(colaboradorService.findById(id));
  }

  @PostMapping
  public ResponseEntity<Colaborador> create(@RequestBody Colaborador colaborador){
    return ResponseEntity.ok(colaboradorService.create(colaborador));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Colaborador> update(@PathVariable String id, @RequestBody Colaborador colaborador){
    return ResponseEntity.ok(colaboradorService.update(id, colaborador));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id){
    colaboradorService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
