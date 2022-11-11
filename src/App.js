import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Login from './components/login/login';
import Newuser from './components/newuser/newUser';
import Summary from './components/summary/summary';
import Details from './components/details/details';
const App =()=>{
  return <Router>
    <Routes>
    <Route path="/login" element={<Login/>}/>
      
  
    <Route path="/newuser" element={<Newuser/>} />
      
    
    <Route path="/gps/summary" element={<Summary/>} />
      
    
    <Route path="/gps/details/:deviceId/:deviceType" element={<Details/>}/ >
    <Route path="*" element={<Login/>} />
    </Routes>
  </Router>
}

export default App;
