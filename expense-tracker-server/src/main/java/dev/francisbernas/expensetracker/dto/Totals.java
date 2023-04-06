package dev.francisbernas.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class Totals {

  private BigDecimal income;

  private BigDecimal expense;

}
