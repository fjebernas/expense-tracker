import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootswatch/dist/journal/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import { Chart as ChartJS, ArcElement, Legend, Tooltip, Colors, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Colors,
  BarElement
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
