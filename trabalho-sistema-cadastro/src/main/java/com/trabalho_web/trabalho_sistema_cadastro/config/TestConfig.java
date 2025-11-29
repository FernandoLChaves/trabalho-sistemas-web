package com.trabalho_web.trabalho_sistema_cadastro.config;

import java.time.LocalDateTime;

import com.trabalho_web.trabalho_sistema_cadastro.entities.*;
import com.trabalho_web.trabalho_sistema_cadastro.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private VendaRepository vendaRepository;

    @Override
    public void run(String... args) throws Exception {
        Cargo cargo1 = new Cargo(null, "Desenvolvedor", "Desenvolvimento de software");
        Cargo cargo2 = new Cargo(null, "Gerente", "Gestão de equipes e projetos");
        Cargo cargo3 = new Cargo(null, "Analista", "Análise de sistemas e requisitos");

        cargoRepository.save(cargo1);
        cargoRepository.save(cargo2);
        cargoRepository.save(cargo3);

        Categoria cat1 = new Categoria(null, "Eletrônicos", "Produtos eletrônicos", null);
        Categoria cat2 = new Categoria(null, "Alimentos", "Produtos alimentícios", null);
        Categoria cat3 = new Categoria(null, "Vestuário", "Roupas e acessórios", null);
        Categoria cat4 = new Categoria(null, "Livros", "Livros e publicações", null);
        Categoria cat5 = new Categoria(null, "Esportes", "Artigos esportivos", null);

        categoriaRepository.save(cat1);
        categoriaRepository.save(cat2);
        categoriaRepository.save(cat3);
        categoriaRepository.save(cat4);
        categoriaRepository.save(cat5);

        Colaborador col1 = new Colaborador(null, "João Silva", "123.456.789-00", "1990-05-15", cargo1);
        Colaborador col2 = new Colaborador(null, "Maria Santos", "987.654.321-00", "1985-08-22", cargo2);
        Colaborador col3 = new Colaborador(null, "Pedro Oliveira", "456.789.123-00", "1992-03-10", cargo1);
        Colaborador col4 = new Colaborador(null, "Ana Costa", "321.654.987-00", "1988-11-30", cargo3);
        Colaborador col5 = new Colaborador(null, "Carlos Souza", "789.123.456-00", "1995-07-18", cargo1);

        colaboradorRepository.save(col1);
        colaboradorRepository.save(col2);
        colaboradorRepository.save(col3);
        colaboradorRepository.save(col4);
        colaboradorRepository.save(col5);

        Produto prod1 = new Produto();
        prod1.setNome("Notebook Dell");
        prod1.setQuantidade(10);
        prod1.setPreco(3500.00);
        prod1.setStatus("Disponível");
        prod1.setCategoria(cat1);

        Produto prod2 = new Produto();
        prod2.setNome("Mouse Logitech");
        prod2.setQuantidade(50);
        prod2.setPreco(89.90);
        prod2.setStatus("Disponível");
        prod2.setCategoria(cat1);

        Produto prod3 = new Produto();
        prod3.setNome("Teclado Mecânico");
        prod3.setQuantidade(25);
        prod3.setPreco(450.00);
        prod3.setStatus("Disponível");
        prod3.setCategoria(cat1);

        Produto prod4 = new Produto();
        prod4.setNome("Arroz Integral 1kg");
        prod4.setQuantidade(100);
        prod4.setPreco(8.50);
        prod4.setStatus("Disponível");
        prod4.setCategoria(cat2);

        Produto prod5 = new Produto();
        prod5.setNome("Feijão Preto 1kg");
        prod5.setQuantidade(80);
        prod5.setPreco(7.90);
        prod5.setStatus("Disponível");
        prod5.setCategoria(cat2);

        Produto prod6 = new Produto();
        prod6.setNome("Macarrão Integral 500g");
        prod6.setQuantidade(60);
        prod6.setPreco(5.50);
        prod6.setStatus("Disponível");
        prod6.setCategoria(cat2);

        Produto prod7 = new Produto();
        prod7.setNome("Camiseta Básica");
        prod7.setQuantidade(150);
        prod7.setPreco(39.90);
        prod7.setStatus("Disponível");
        prod7.setCategoria(cat3);

        Produto prod8 = new Produto();
        prod8.setNome("Calça Jeans");
        prod8.setQuantidade(75);
        prod8.setPreco(129.90);
        prod8.setStatus("Disponível");
        prod8.setCategoria(cat3);

        Produto prod9 = new Produto();
        prod9.setNome("Tênis Esportivo");
        prod9.setQuantidade(40);
        prod9.setPreco(249.90);
        prod9.setStatus("Disponível");
        prod9.setCategoria(cat3);

        Produto prod10 = new Produto();
        prod10.setNome("Clean Code");
        prod10.setQuantidade(30);
        prod10.setPreco(89.90);
        prod10.setStatus("Disponível");
        prod10.setCategoria(cat4);

        Produto prod11 = new Produto();
        prod11.setNome("Design Patterns");
        prod11.setQuantidade(25);
        prod11.setPreco(95.00);
        prod11.setStatus("Disponível");
        prod11.setCategoria(cat4);

        Produto prod12 = new Produto();
        prod12.setNome("Refactoring");
        prod12.setQuantidade(20);
        prod12.setPreco(85.00);
        prod12.setStatus("Disponível");
        prod12.setCategoria(cat4);

        Produto prod13 = new Produto();
        prod13.setNome("Bola de Futebol");
        prod13.setQuantidade(45);
        prod13.setPreco(79.90);
        prod13.setStatus("Disponível");
        prod13.setCategoria(cat5);

        Produto prod14 = new Produto();
        prod14.setNome("Raquete de Tênis");
        prod14.setQuantidade(15);
        prod14.setPreco(350.00);
        prod14.setStatus("Disponível");
        prod14.setCategoria(cat5);

        Produto prod15 = new Produto();
        prod15.setNome("Kit Halteres 10kg");
        prod15.setQuantidade(20);
        prod15.setPreco(189.90);
        prod15.setStatus("Disponível");
        prod15.setCategoria(cat5);

        produtoRepository.save(prod1);
        produtoRepository.save(prod2);
        produtoRepository.save(prod3);
        produtoRepository.save(prod4);
        produtoRepository.save(prod5);
        produtoRepository.save(prod6);
        produtoRepository.save(prod7);
        produtoRepository.save(prod8);
        produtoRepository.save(prod9);
        produtoRepository.save(prod10);
        produtoRepository.save(prod11);
        produtoRepository.save(prod12);
        produtoRepository.save(prod13);
        produtoRepository.save(prod14);
        produtoRepository.save(prod15);

        Venda venda1 = new Venda();
        venda1.setColaborador(col1);
        venda1.setDataVenda(LocalDateTime.now().minusDays(2));

        ItemVenda item1 = new ItemVenda();
        item1.setVenda(venda1);
        item1.setProduto(prod1);
        item1.setQuantidade(2);
        item1.setPrecoUnitario(prod1.getPreco());

        ItemVenda item2 = new ItemVenda();
        item2.setVenda(venda1);
        item2.setProduto(prod2);
        item2.setQuantidade(3);
        item2.setPrecoUnitario(prod2.getPreco());

        venda1.getItens().add(item1);
        venda1.getItens().add(item2);
        venda1.setValorTotal((prod1.getPreco() * 2) + (prod2.getPreco() * 3));

        vendaRepository.save(venda1);

        Venda venda2 = new Venda();
        venda2.setColaborador(col2);
        venda2.setDataVenda(LocalDateTime.now().minusDays(1));

        ItemVenda item3 = new ItemVenda();
        item3.setVenda(venda2);
        item3.setProduto(prod10);
        item3.setQuantidade(1);
        item3.setPrecoUnitario(prod10.getPreco());

        venda2.getItens().add(item3);
        venda2.setValorTotal(prod10.getPreco());

        vendaRepository.save(venda2);
    }
}

