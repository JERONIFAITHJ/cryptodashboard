import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/LandingPage/Navbar/Navbar';
import Pages from './Pages/Pages';
import Store from './Store/Store';

function App() {
  return (
    <div className="App">
      <Store>
        <Navbar />
        <Pages />
        <Footer />
      </Store>
    </div>
  );
}

export default App;