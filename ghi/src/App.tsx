import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Navbar from './Navbar';
import AllGames from './Games/AllGames';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <div className="App">
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path='/games' element={<AllGames/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
