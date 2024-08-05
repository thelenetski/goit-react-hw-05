import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './copmponents/AppBar/AppBar';

const Home = lazy(() => import('./pages/Home/Home'));
const Movies = lazy(() => import('./pages/Movies/Movies'));

function App() {
  return (
    <>
      <AppBar />
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
