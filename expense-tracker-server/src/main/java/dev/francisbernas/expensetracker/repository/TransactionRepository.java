package dev.francisbernas.expensetracker.repository;

import dev.francisbernas.expensetracker.model.transaction.Transaction;

import java.util.List;

public interface TransactionRepository {

  List<Transaction> findByBudgetIdEquals(Long budgetId);

}
