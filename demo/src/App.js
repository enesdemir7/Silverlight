import './App.css';
import Search from './components/search';
import Logo from './components/Logo';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import ViewInfo from './components/ViewInfo';


function App() {

  return (
    <div className="App" >
      <Router>
              <Routes>
                <Route path="/" element={<><Logo/> <Search/> </>} />
                <Route path="/viewinfo/:item" element={<ViewInfo/>} />             
              </Routes>
      </Router>
    </div>
  );

}

export default App;
