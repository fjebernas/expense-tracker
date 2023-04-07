import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import MainContent from './component/MainContent/MainContent';
import Toasts from './component/MainContent/Toasts';
import Analytics from './component/Analytics/Analytics';

function App() {

  return (
    <BrowserRouter>
      <div className="App min-vh-100 d-flex flex-column">
        <Header />
        <Toasts />
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/manage' element={<MainContent />} />
          <Route path='/analytics' element={<Analytics />} />
        </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
