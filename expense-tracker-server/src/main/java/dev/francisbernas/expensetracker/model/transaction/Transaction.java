package dev.francisbernas.expensetracker.model.transaction;

import dev.francisbernas.expensetracker.model.Auditable;
import dev.francisbernas.expensetracker.model.Budget;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@MappedSuperclass
public abstract class Transaction extends Auditable implements Comparable<Transaction> {
  @NotNull(message = "Description must not be null")
  @NotEmpty(message = "Description must not be an empty string")
  @Column(nullable = false)
  protected String description;

  @NotNull(message = "Amount must not be null")
  @DecimalMin(value = "0.00", inclusive = false, message = "Amount must be greater than 0")
  @Column(nullable = false)
  protected BigDecimal amount;

  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "budget_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  protected Budget budget;

  @Override
  public int compareTo(Transaction transaction) {
    if (getCreatedAt() == null || transaction.getCreatedAt() == null)
      return 0;
    return getCreatedAt().compareTo(transaction.getCreatedAt());
  }
}
