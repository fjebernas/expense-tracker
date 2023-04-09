package dev.francisbernas.expensetracker.dto;

import dev.francisbernas.expensetracker.model.transaction.Transaction;
import lombok.*;

import java.util.Comparator;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class TransactionDto implements Comparable<TransactionDto> {

  private Transaction transaction;

  private String category;


  @Override
  public int compareTo(TransactionDto transactionDto) {
    if (transaction.getCreatedAt() == null || transactionDto.transaction.getCreatedAt() == null)
      return 0;
    return transaction.getCreatedAt().compareTo(transactionDto.transaction.getCreatedAt());
  }
}
