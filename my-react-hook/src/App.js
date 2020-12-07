import './App.css';
import Button from './pages/Button';
//import DataLoader from './pages/DataLoader';
//import GithubCommit from './pages/GithubCommit';
import ItemList from './components/ItemList';

function App() {
  return (
    <div className="App">
      <Button />
      {/* <DataLoader folder="sdc" /> */}
      <ItemList/>
      {/* <GithubCommit /> */}
    </div>
  );
}

export default App;
