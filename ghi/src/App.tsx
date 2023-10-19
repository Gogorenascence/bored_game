import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<MainPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
