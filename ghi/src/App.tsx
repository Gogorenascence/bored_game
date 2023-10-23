import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <div className="App">
        <Routes>
          <Route index element={<MainPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
