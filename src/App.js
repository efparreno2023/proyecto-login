import React, {useState} from 'react'
import './App.css';
import Home from './components/Login'
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
  const [usuario, setUsuario] = useState(null)
  return (
    <div className="App">
    {usuario ? <Home/>: <Login/>}
      
       
    </div>
  );
}

export default App;
