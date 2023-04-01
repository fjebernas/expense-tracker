package dev.francisbernas.expensetracker.controller;

import dev.francisbernas.expensetracker.exception.ResourceNotFoundException;
import dev.francisbernas.expensetracker.model.Budget;
import dev.francisbernas.expensetracker.model.transaction.Expense;
import dev.francisbernas.expensetracker.model.transaction.Transaction;
import dev.francisbernas.expensetracker.repository.BudgetRepository;
import dev.francisbernas.expensetracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("${serverBaseUrl}")
public class ExpenseController {
  private final ExpenseRepository expenseRepository;
  private final BudgetRepository budgetRepository;

  public ExpenseController(ExpenseRepository expenseRepository, BudgetRepository budgetRepository) {
    this.expenseRepository = expenseRepository;
    this.budgetRepository = budgetRepository;
  }

  @GetMapping("/budgets/{budgetId}/expenses")
  public List<Transaction> getAllExpensesByBudgetId(@PathVariable Long budgetId) {
    return expenseRepository.findByBudgetIdEquals(budgetId);
  }

  @PostMapping("/budgets/{budgetId}/expenses")
  public Expense createExpense(@PathVariable Long budgetId, @RequestBody Expense expenseRequest) throws ResourceNotFoundException {
    return budgetRepository.findById(budgetId).map(budget -> {
      expenseRequest.setBudget(budget);
      return expenseRepository.save(expenseRequest);
    }).orElseThrow(() -> new ResourceNotFoundException(Budget.class, budgetId));
  }
}
