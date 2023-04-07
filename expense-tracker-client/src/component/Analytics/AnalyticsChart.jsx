import { Bar, Chart, Line } from "react-chartjs-2";

function AnalyticsChart(props) {

  const labels = props.totalDtos.map(totalDto => totalDto.budget.name);
  const incomes = props.totalDtos.map(totalDto => totalDto.totals.income);
  const expenses = props.totalDtos.map(totalDto => totalDto.totals.expense);
  const remainingBalances = props.totalDtos.map(totalDto => totalDto.totals.income - totalDto.totals.expense);

  const remainingBalanceRGBA = 'rgba(51, 102, 153, 0.5)';
  const incomeRGBA = 'rgba(34, 178, 76, 0.5)';
  const expenseRGBA = 'rgba(245, 122, 0, 0.5)';
  
  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Remaining balance',
        data: remainingBalances,
        borderColor: remainingBalanceRGBA,
        backgroundColor: remainingBalanceRGBA,
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 12,
        fill: false,
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Total income',
        data: incomes,
        borderColor: incomeRGBA,
        backgroundColor: incomeRGBA,
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      },
      {
        type: 'bar',
        label: 'Total expense',
        data: expenses,
        borderColor: expenseRGBA,
        backgroundColor: expenseRGBA,
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      },
    ],
  };

  return (
    <Line data={data} />
  );
}

export default AnalyticsChart;