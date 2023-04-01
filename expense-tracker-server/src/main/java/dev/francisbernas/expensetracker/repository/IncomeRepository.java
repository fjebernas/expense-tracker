package dev.francisbernas.expensetracker.repository;

import dev.francisbernas.expensetracker.model.transaction.Income;
import dev.francisbernas.expensetracker.model.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long>, TransactionRepository {
  @Override
  List<Transaction> findByBudgetIdEquals(Long budgetId);
}
