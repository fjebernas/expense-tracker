package dev.francisbernas.expensetracker.model;

import dev.francisbernas.expensetracker.model.transaction.Transaction;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "budgets")
public class Budget extends Auditable implements Comparable<Budget> {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @NotNull
  @NotEmpty
  @Column(nullable = false)
  private String name;

  @Override
  public int compareTo(Budget budget) {
    if (getCreatedAt() == null || budget.getCreatedAt() == null)
      return 0;
    return getCreatedAt().compareTo(budget.getCreatedAt());
  }
}
