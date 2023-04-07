package dev.francisbernas.expensetracker.controller;

import dev.francisbernas.expensetracker.dto.Totals;
import dev.francisbernas.expensetracker.dto.TotalsDto;
import dev.francisbernas.expensetracker.exception.ResourceNotFoundException;
import dev.francisbernas.expensetracker.model.Budget;
import dev.francisbernas.expensetracker.model.transaction.Transaction;
import dev.francisbernas.expensetracker.repository.BudgetRepository;
import dev.francisbernas.expensetracker.repository.ExpenseRepository;
import dev.francisbernas.expensetracker.repository.IncomeRepository;
import dev.francisbernas.expensetracker.repository.TransactionRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("${serverBaseUrl}")
public class TotalsController {

  private final BudgetRepository budgetRepository;
  private final IncomeRepository incomeRepository;
  private final ExpenseRepository expenseRepository;

  public TotalsController(BudgetRepository budgetRepository, IncomeRepository incomeRepository, ExpenseRepository expenseRepository) {
    this.budgetRepository = budgetRepository;
    this.incomeRepository = incomeRepository;
    this.expenseRepository = expenseRepository;
  }

  @GetMapping("/totals/highest")
  public Optional<TotalsDto> getTotalDtoWithHighestSpecifiedCategory(@RequestParam String category) {
    List<TotalsDto> totalsDtos = getAllTotalDtos();

    if (category.equalsIgnoreCase("income")) {
      return totalsDtos.stream().max(
              Comparator.comparing(t -> t.getTotals().getIncome())
      );
    }
    if (category.equalsIgnoreCase("expense")) {
      return totalsDtos.stream().max(
              Comparator.comparing(t -> t.getTotals().getExpense())
      );
    }

    return Optional.empty();
  }

  @GetMapping("/totals")
  public List<TotalsDto> getAllTotalDtos() {
    List<TotalsDto> totalsDtos = new ArrayList<>();

    List<Budget> budgets = budgetRepository.findAll();
    for (Budget budget : budgets) {
      List<Transaction> incomeTransactions =  getAllTransactionsByBudgetIdFrom(incomeRepository, budget.getId());
      List<Transaction> expenseTransactions = getAllTransactionsByBudgetIdFrom(expenseRepository, budget.getId());

      BigDecimal totalIncome = getTotalAmountOfTransactions(incomeTransactions);
      BigDecimal totalExpense = getTotalAmountOfTransactions(expenseTransactions);

      TotalsDto totalsDto = new TotalsDto();
      totalsDto.setBudget(budget);
      totalsDto.setTotals(new Totals(
              totalIncome,
              totalExpense
      ));

      totalsDtos.add(totalsDto);
    }

    return totalsDtos;
  }

  @GetMapping("/budgets/{budgetId}/totals")
  public TotalsDto getTotalsByBudgetId(@PathVariable Long budgetId) {
    return budgetRepository.findById(budgetId).map(budget -> {
      List<Transaction> incomeTransactions =  getAllTransactionsByBudgetIdFrom(incomeRepository, budget.getId());
      List<Transaction> expenseTransactions = getAllTransactionsByBudgetIdFrom(expenseRepository, budget.getId());

      BigDecimal totalIncome = getTotalAmountOfTransactions(incomeTransactions);
      BigDecimal totalExpense = getTotalAmountOfTransactions(expenseTransactions);

      TotalsDto totalsDto = new TotalsDto();
      totalsDto.setBudget(budget);
      totalsDto.setTotals(new Totals(
              totalIncome,
              totalExpense
      ));

      return totalsDto;
    }).orElseThrow(() -> new ResourceNotFoundException(Budget.class, budgetId));
  }

  private BigDecimal getTotalAmountOfTransactions(List<Transaction> transactions) {
    return transactions
            .stream()
            .map(Transaction::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
  }

  private List<Transaction> getAllTransactionsByBudgetIdFrom(TransactionRepository transactionRepository, Long budgetId) {
    return budgetRepository
            .findById(budgetId)
            .map(budget -> transactionRepository.findByBudgetIdEquals(budget.getId()))
            .orElseThrow(() -> new ResourceNotFoundException(Budget.class, budgetId));
  }
}
