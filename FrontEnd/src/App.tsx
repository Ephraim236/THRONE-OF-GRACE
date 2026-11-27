import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Vote from './pages/Vote';
import Store from './pages/Store';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="vote" element={<Vote />} />
          <Route path="store" element={<Store />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
