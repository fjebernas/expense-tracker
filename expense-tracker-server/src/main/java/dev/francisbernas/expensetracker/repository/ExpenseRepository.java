package dev.francisbernas.expensetracker.repository;

import dev.francisbernas.expensetracker.model.transaction.Expense;
import dev.francisbernas.expensetracker.model.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, TransactionRepository {
  @Override
  List<Transaction> findByBudgetIdEquals(Long budgetId);
}
