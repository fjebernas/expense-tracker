package dev.francisbernas.expensetracker.model.transaction;

import dev.francisbernas.expensetracker.model.Auditable;
import dev.francisbernas.expensetracker.model.Budget;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@MappedSuperclass
public abstract class Transaction extends Auditable implements Comparable<Transaction> {
  @Column(nullable = false)
  protected String description;

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
