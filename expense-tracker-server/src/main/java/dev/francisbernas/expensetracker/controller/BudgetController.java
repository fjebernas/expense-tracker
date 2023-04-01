package dev.francisbernas.expensetracker.controller;

import dev.francisbernas.expensetracker.model.Budget;
import dev.francisbernas.expensetracker.repository.BudgetRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("${serverBaseUrl}")
public class BudgetController {
  private final BudgetRepository budgetRepository;

  public BudgetController(BudgetRepository budgetRepository) {
    this.budgetRepository = budgetRepository;
  }

  @GetMapping("/budgets")
  public List<Budget> getAllBudgets() {
    List<Budget> budgets = budgetRepository.findAll();
    budgets.sort(Collections.reverseOrder());
    return budgets;
  }

  @PostMapping("/budgets")
  public Budget createBudget(@Valid @RequestBody Budget budgetRequest) {
    return budgetRepository.save(budgetRequest);
  }

  @DeleteMapping("/budgets/{budgetId}")
  public void deleteBudget(@PathVariable Long budgetId) {
    budgetRepository.deleteById(budgetId);
  }
}
