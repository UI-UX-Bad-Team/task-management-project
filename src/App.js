import logo from './logo.svg';
import './App.css';
import './pages/dashboard/Dashboard'
import Dashboard from './pages/dashboard/Dashboard';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <div className="App">
		<Navigation />
      	<Dashboard />
    </div>
  );
}

export default App;
