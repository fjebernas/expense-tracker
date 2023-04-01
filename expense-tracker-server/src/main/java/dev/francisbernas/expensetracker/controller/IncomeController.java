package dev.francisbernas.expensetracker.controller;

import dev.francisbernas.expensetracker.exception.ResourceNotFoundException;
import dev.francisbernas.expensetracker.model.Budget;
import dev.francisbernas.expensetracker.model.transaction.Income;
import dev.francisbernas.expensetracker.model.transaction.Transaction;
import dev.francisbernas.expensetracker.repository.BudgetRepository;
import dev.francisbernas.expensetracker.repository.IncomeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("${serverBaseUrl}")
public class IncomeController {
  private final IncomeRepository incomeRepository;
  private final BudgetRepository budgetRepository;

  public IncomeController(IncomeRepository incomeRepository, BudgetRepository budgetRepository) {
    this.incomeRepository = incomeRepository;
    this.budgetRepository = budgetRepository;
  }

  @GetMapping("/budgets/{budgetId}/incomes")
  public List<Transaction> getAllIncomesByBudgetId(@PathVariable Long budgetId) {
    return incomeRepository.findByBudgetIdEquals(budgetId);
  }

  @PostMapping("/budgets/{budgetId}/incomes")
  public Income createIncome(@PathVariable Long budgetId, @RequestBody Income incomeRequest) throws ResourceNotFoundException {
    return budgetRepository.findById(budgetId).map(budget -> {
      incomeRequest.setBudget(budget);
      return incomeRepository.save(incomeRequest);
    }).orElseThrow(() -> new ResourceNotFoundException(Budget.class, budgetId));
  }
}
