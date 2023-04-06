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
public class TotalDto {
  private String description;

  private BigDecimal amount;
}
