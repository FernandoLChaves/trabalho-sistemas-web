package com.trabalho_web.trabalho_sistema_cadastro.entities;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tb_colaborador")

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class Colaborador {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  private String nome;
  private String cpf;
  private String dataDeNascimento;

  @ManyToOne
  @JoinColumn(name = "cargo_id", nullable = true)
  private Cargo cargo;

  public Colaborador (String id, String nome, String cpf, String dataDeNascimento, Cargo cargo) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.dataDeNascimento = dataDeNascimento;
    this.cargo = cargo;
  }
}
