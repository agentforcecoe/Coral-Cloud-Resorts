import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Placeholder from './pages/Placeholder';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<RoomDetail />} />
        <Route path="/dining" element={<Placeholder page="dining" />} />
        <Route path="/spa" element={<Placeholder page="spa" />} />
        <Route path="/experiences" element={<Placeholder page="experiences" />} />
        <Route path="/contact" element={<Placeholder page="contact" />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}
