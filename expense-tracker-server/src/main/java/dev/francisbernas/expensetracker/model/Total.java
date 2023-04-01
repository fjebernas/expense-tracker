package dev.francisbernas.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class Total {
  private String description;

  private BigDecimal amount;
}
