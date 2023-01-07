import './App.css';
import Navbar from './Components/LandingPage/Navbar/Navbar';
import Pages from './Pages/Pages';
import Store from './Store/Store';

function App() {
  return (
    <div className="App">
      <Store>
        <Navbar />
        <Pages />
      </Store>
    </div>
  );
}

export default App;