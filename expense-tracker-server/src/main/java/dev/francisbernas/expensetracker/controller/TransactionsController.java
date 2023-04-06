package dev.francisbernas.expensetracker.controller;

import dev.francisbernas.expensetracker.dto.TransactionDto;
import dev.francisbernas.expensetracker.exception.ResourceNotFoundException;
import dev.francisbernas.expensetracker.model.Budget;
import dev.francisbernas.expensetracker.model.transaction.Transaction;
import dev.francisbernas.expensetracker.repository.BudgetRepository;
import dev.francisbernas.expensetracker.repository.ExpenseRepository;
import dev.francisbernas.expensetracker.repository.IncomeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("${serverBaseUrl}")
public class TransactionsController {
  private final BudgetRepository budgetRepository;
  private final IncomeRepository incomeRepository;
  private final ExpenseRepository expenseRepository;

  public TransactionsController(BudgetRepository budgetRepository, IncomeRepository incomeRepository, ExpenseRepository expenseRepository) {
    this.budgetRepository = budgetRepository;
    this.incomeRepository = incomeRepository;
    this.expenseRepository = expenseRepository;
  }

  @GetMapping("/budgets/{budgetId}/transactions")
  public List<TransactionDto> getAllTransactionDtosByBudgetId(@PathVariable Long budgetId) {
    return budgetRepository.findById(budgetId).map(budget -> {
      List<TransactionDto> transactionDtos = new ArrayList<>();

      for (Transaction transaction : incomeRepository.findByBudgetIdEquals(budget.getId())) {
        TransactionDto transactionDto = new TransactionDto(transaction, "income");
        transactionDtos.add(transactionDto);
      }
      for (Transaction transaction : expenseRepository.findByBudgetIdEquals(budget.getId())) {
        TransactionDto transactionDto = new TransactionDto(transaction, "expense");
        transactionDtos.add(transactionDto);
      }

      transactionDtos.sort(Collections.reverseOrder());
      return transactionDtos;
    }).orElseThrow(() -> new ResourceNotFoundException(Budget.class, budgetId));
  }
}
