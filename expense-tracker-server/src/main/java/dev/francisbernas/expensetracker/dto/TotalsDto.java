package dev.francisbernas.expensetracker.dto;

import dev.francisbernas.expensetracker.model.Budget;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class TotalsDto {

  private Budget budget;

  private Totals totals;

}
