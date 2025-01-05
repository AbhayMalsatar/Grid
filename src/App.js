import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grid from './Components/Grid';
import './Assets/CSS/style.css';
import GridDropDown from './Components/GridDropDown';
import MultuColumnDropdown from './Components/MultuColumnDropdown';
import MyAgGridComponent from './Components/MyAgGridComponent';
import InpputBox from './Components/InpputBox';



function App() {
  return (
    <BrowserRouter>
    <Routes>    
      <Route path="/" element={<MyAgGridComponent />} />
      <Route path="/input" element={<InpputBox />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
