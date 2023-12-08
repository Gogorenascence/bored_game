import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Navbar from './Navbar';
import AllGames from './Games/AllGames';
import GameDetails from './Games/GameDetails';
import AppProvider from './Context/AppProvider';

function App() {
  return (
    <AppProvider>
    <BrowserRouter>
    <Navbar/>
      <div className="App">
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path='/games/:pageNumber' element={<AllGames/>}/>
          <Route path='/game/:id' element={<GameDetails/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
