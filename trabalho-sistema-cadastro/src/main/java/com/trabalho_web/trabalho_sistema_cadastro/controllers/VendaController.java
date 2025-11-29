package com.trabalho_web.trabalho_sistema_cadastro.controllers;


import com.trabalho_web.trabalho_sistema_cadastro.entities.Venda;
import com.trabalho_web.trabalho_sistema_cadastro.services.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @GetMapping
    public ResponseEntity<List<Venda>> findAll() {
        return ResponseEntity.ok(vendaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> findById(@PathVariable String id) {
        return ResponseEntity.ok(vendaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Venda> create(@RequestBody Venda venda) {
        return ResponseEntity.ok(vendaService.create(venda));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Venda> update(@PathVariable String id, @RequestBody Venda venda) {
        return ResponseEntity.ok(vendaService.update(id, venda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        vendaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
