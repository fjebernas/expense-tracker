import { Bar } from "react-chartjs-2";

function AnalyticsChart(props) {

  const labels = props.totalDtos.map(totalDto => totalDto.budget.name);
  const incomes = props.totalDtos.map(totalDto => totalDto.totals.income);
  const expenses = props.totalDtos.map(totalDto => totalDto.totals.expense);
  const remainingBalances = props.totalDtos.map(totalDto => totalDto.totals.income - totalDto.totals.expense);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Incomes',
        data: incomes,
        borderColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      },
      {
        label: 'Expenses',
        data: expenses,
        borderColor: 'rgba(255, 99, 132, 0.5)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      },
      {
        label: 'Remaining balance',
        data: remainingBalances,
        borderColor: 'rgba(100, 255, 132, 0.5)',
        backgroundColor: 'rgba(100, 255, 132, 0.5',
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
}

export default AnalyticsChart;