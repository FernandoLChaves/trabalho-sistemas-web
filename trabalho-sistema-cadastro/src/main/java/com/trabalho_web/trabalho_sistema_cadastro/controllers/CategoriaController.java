package com.trabalho_web.trabalho_sistema_cadastro.controllers;

import com.trabalho_web.trabalho_sistema_cadastro.entities.Categoria;
import com.trabalho_web.trabalho_sistema_cadastro.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> findAll() {
        return ResponseEntity.ok(categoriaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> findById(@PathVariable String id) {
        return ResponseEntity.ok(categoriaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Categoria> create(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.create(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> update(@PathVariable String id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.update(id, categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
