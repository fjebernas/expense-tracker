import './App.css';
import Footer from './component/Footer';
import Header from './component/Header';
import MainContent from './component/MainContent/MainContent';
import Toasts from './component/MainContent/Toasts';

function App() {

  return (
    <div className="App min-vh-100 d-flex flex-column">
      <Header />
      <Toasts />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
