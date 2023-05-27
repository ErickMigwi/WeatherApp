import logo from './logo.svg';
import './App.css';
import Home from './Componets/Home';
import { Routes, Route } from 'react-router-dom';
import Contact from './Componets/Contact';
function App() {
  return(
    <div>
  <Home/>
 <Routes>
     
      <Route path= '/aboutUs' element= {<Contact/>}/>
    </Routes>
  </div>

 )
}

export default App;
