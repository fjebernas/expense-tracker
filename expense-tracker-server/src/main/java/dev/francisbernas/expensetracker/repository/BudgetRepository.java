package dev.francisbernas.expensetracker.repository;

import dev.francisbernas.expensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}
