import randomColor from "randomcolor";
import { Doughnut } from "react-chartjs-2";

function Chart(props) {

  const labels = props.transactions.map(transaction => transaction.description);

  const amounts = props.transactions.map(transaction => transaction.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'amount',
        data: amounts,
        borderWidth: 1,
        backgroundColor: randomColor({ count: 500, luminosity: 'light', alpha: '1' }),
        borderColor: '#fff',
      },
    ],
  };

  return (
    <Doughnut data={chartData} />
  );
}

export default Chart;