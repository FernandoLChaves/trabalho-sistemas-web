package com.trabalho_web.trabalho_sistema_cadastro.controllers;


import com.trabalho_web.trabalho_sistema_cadastro.entities.Produto;
import com.trabalho_web.trabalho_sistema_cadastro.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Produto>> findAll(){
        return ResponseEntity.ok(produtoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable String id){
        return ResponseEntity.ok(produtoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Produto> create(@RequestBody Produto produto){
        return ResponseEntity.ok(produtoService.create(produto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> update(@PathVariable String id, @RequestBody Produto produto){
        return ResponseEntity.ok(produtoService.update(id, produto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        produtoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
