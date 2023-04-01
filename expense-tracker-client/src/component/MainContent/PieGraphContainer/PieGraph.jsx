import randomColor from "randomcolor";
import { Pie } from "react-chartjs-2";

function PieGraph(props) {

  const labels = props.transactions.map(transaction => transaction.description);

  const amounts = props.transactions.map(transaction => transaction.amount);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'amount',
        data: amounts,
        borderWidth: 1,
        backgroundColor: randomColor({ count: 500, luminosity: 'dark', alpha: '0.7' }),
        borderColor: '#fff'
      },
    ],
  };

  return (
    <Pie data={chartData} />
  );
}

export default PieGraph;