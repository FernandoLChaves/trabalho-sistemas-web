package com.trabalho_web.trabalho_sistema_cadastro.services;


import com.trabalho_web.trabalho_sistema_cadastro.entities.ItemVenda;
import com.trabalho_web.trabalho_sistema_cadastro.entities.Produto;
import com.trabalho_web.trabalho_sistema_cadastro.entities.Venda;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.ProdutoRepository;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Venda> findAll() {
        return vendaRepository.findAll();
    }

    public Venda findById(String id) {
        return vendaRepository.findById(id).orElseThrow(() -> new RuntimeException("Venda não encontrada"));
    }

    public Venda create(Venda venda) {
        venda.setDataVenda(LocalDateTime.now());

        Double total = 0.0;
        for (ItemVenda item : venda.getItens()) {
            item.setVenda(venda);
            total += item.getPrecoUnitario() * item.getQuantidade();

            // Busca o produto completo do banco de dados
            Produto produto = produtoRepository.findById(String.valueOf(item.getProduto().getId()))
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            
            if (produto.getQuantidade() == null || produto.getQuantidade() < item.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }
            produto.setQuantidade(produto.getQuantidade() - item.getQuantidade());
            produtoRepository.save(produto);
            
            // Atualiza a referência do produto no item
            item.setProduto(produto);
        }
        venda.setValorTotal(total);

        return vendaRepository.save(venda);
    }

    public Venda update(String id, Venda venda) {
        Venda vendaExistente = findById(id);
        vendaExistente.setColaborador(venda.getColaborador());

        vendaExistente.getItens().clear();

        Double total = 0.0;
        for (ItemVenda item : venda.getItens()) {
            item.setVenda(vendaExistente);
            vendaExistente.getItens().add(item);
            total += item.getPrecoUnitario() * item.getQuantidade();
        }
        vendaExistente.setValorTotal(total);

        return vendaRepository.save(vendaExistente);
    }

    public void delete(String id) {
        vendaRepository.deleteById(id);
    }
}

