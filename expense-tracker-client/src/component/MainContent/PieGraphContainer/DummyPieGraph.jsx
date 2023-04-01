import { Pie } from "react-chartjs-2";

function DummyPieGraph() {
  const chartData = {
    labels: ['test'],
    datasets: [
      {
        label: 'test',
        data: [1],
        borderWidth: 1,
        backgroundColor: '#e5e5e5',
        borderColor: '#fff'
      },
    ],
  };

  return (
    <Pie data={chartData} />
  );
}

export default DummyPieGraph;